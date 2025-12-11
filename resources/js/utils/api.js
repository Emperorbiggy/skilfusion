// resources/js/utils/api.js
export const api = {
  request: async (endpoint, options = {}) => {
    let token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    if (csrfToken) {
      headers["X-CSRF-TOKEN"] = csrfToken;
    }

    const response = await fetch(`/api${endpoint}`, {
      ...options,
      headers,
    });

    // If not ok, handle gracefully
    if (!response.ok) {
      // Extract error from backend if available
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // ignore JSON parse errors
      }

      // Special case: 401 but on login/reset → do not refresh
      if (
        response.status === 401 &&
        !endpoint.includes("/login") &&
        !endpoint.includes("/reset")
      ) {
        try {
          const refreshResponse = await fetch("/api/refresh", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-CSRF-TOKEN": csrfToken,
            },
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem("access_token", refreshData.access_token);
            token = refreshData.access_token;

            // Retry original request
            headers["Authorization"] = `Bearer ${token}`;
            const retryResponse = await fetch(`/api${endpoint}`, {
              ...options,
              headers,
            });

            if (!retryResponse.ok) {
              throw new Error(errorMessage);
            }

            return await retryResponse.json();
          } else {
            localStorage.removeItem("access_token");
            localStorage.removeItem("student_data");
            throw new Error("Session expired. Please log in again.");
          }
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("student_data");
          throw new Error("Session expired. Please log in again.");
        }
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },

  get: async (endpoint) => api.request(endpoint, { method: "GET" }),
  post: async (endpoint, data) =>
    api.request(endpoint, { method: "POST", body: JSON.stringify(data) }),
  put: async (endpoint, data) =>
    api.request(endpoint, { method: "PUT", body: JSON.stringify(data) }),
  delete: async (endpoint) => api.request(endpoint, { method: "DELETE" }),
};

export const studentApi = {
  login: (credentials) => api.post("/login", credentials),
  logout: () => api.post("/logout"),
  refreshToken: () => api.post("/refresh"),
  resetPassword: (data) => api.post("/reset", data),
  getCurrentUser: () => api.get("/me"),
  getDashboard: () => api.get("/dashboard"),
};
