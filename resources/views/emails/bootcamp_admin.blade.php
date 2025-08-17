<!DOCTYPE html>
<html>
<head>
    <title>New Bootcamp Registration</title>
</head>
<body>
    <h1>New User Registration Notification</h1>
    
    <p>A new participant has registered for the bootcamp:</p>
    
    <ul>
        <li><strong>Name:</strong> {{ $registration->first_name }} {{ $registration->last_name }}</li>
        <li><strong>Email:</strong> {{ $registration->email }}</li>
        <li><strong>Phone:</strong> {{ $registration->phone }}</li>
        <li><strong>Course:</strong> {{ $registration->course === 'web-development' ? 'Web Development' : 'UI/UX Design' }}</li>
        <li><strong>Student ID:</strong> {{ $registration->student_id }}</li>
        <li><strong>Location:</strong> {{ $registration->city }}, {{ $registration->state }}, {{ $registration->country }}</li>
        <li><strong>Registration Date:</strong> {{ $registration->created_at->format('F j, Y H:i') }}</li>
    </ul>
</body>
</html>