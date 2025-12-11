<!DOCTYPE html>
<html>
<head>
    <title>New Bootcamp Registration</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background-color: #3a0ca3; padding: 20px; text-align: center; color: white; }
        .content { padding: 25px; background-color: #ffffff; }
        .info-item { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f0f0f0; }
        .info-label { font-weight: bold; color: #3a0ca3; min-width: 150px; display: inline-block; }
        .footer { text-align: center; padding: 20px; color: #6c757d; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Bootcamp Registration</h1>
        </div>
        
        <div class="content">
            <p>A new participant has registered for the bootcamp:</p>
            
            <div class="info-item">
                <span class="info-label">Admission Number:</span> 
                {{ $registration->student_id }}
            </div>
            
            <div class="info-item">
                <span class="info-label">Name:</span> 
                {{ $fullName }}
            </div>
            
            <div class="info-item">
                <span class="info-label">Email:</span> 
                <a href="mailto:{{ $registration->email }}">{{ $registration->email }}</a>
            </div>
            
            <div class="info-item">
                <span class="info-label">Phone:</span> 
                {{ $registration->phone }} (WhatsApp: {{ $registration->whatsapp }})
            </div>
            
            <div class="info-item">
                <span class="info-label">Course:</span> 
                {{ $courseName }}
            </div>
            
            <div class="info-item">
                <span class="info-label">Location:</span> 
                {{ $registration->city }}, {{ $registration->state }}, {{ $registration->country }}
            </div>
            
            <div class="info-item">
                <span class="info-label">Registration Date:</span> 
                {{ $registration->created_at->format('F j, Y \a\t g:i a') }}
            </div>
            
            <p style="margin-top: 20px;">
                View full details in the admin dashboard.
            </p>
        </div>
        
        <div class="footer">
            <p>Automated notification from Skill Fusion Academy Registration System</p>
            <p>© {{ date('Y') }} SkillFusion Africa. All rights reserved.</p>
        </div>
    </div>
</body>
</html>