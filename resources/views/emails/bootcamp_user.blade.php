<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Skill Fusion Academy</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
               line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; 
               padding: 20px; background-color: #f5f7fa; }
        .card { background: white; border-radius: 10px; padding: 30px; 
                box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .header { text-align: center; margin-bottom: 25px; }
        .header h1 { color: #4361ee; font-size: 28px; }
        .credentials { background: #f0f7ff; padding: 20px; border-radius: 8px; 
                      border-left: 4px solid #4361ee; margin: 20px 0; }
        .info-item { margin-bottom: 15px; }
        .info-label { font-weight: 600; color: #4361ee; display: inline-block; 
                     min-width: 150px; }
        .cta-button { display: block; background: #4361ee; color: white; 
                     text-align: center; padding: 15px; border-radius: 8px; 
                     text-decoration: none; font-weight: 600; margin: 25px 0; }
        .footer { text-align: center; margin-top: 30px; color: #777; 
                 font-size: 14px; padding-top: 20px; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            <h1>Welcome to Skill Fusion Academy!</h1>
        </div>
        
        <p>Dear {{ $registration->first_name }} {{ $registration->last_name }},</p>
        
        <p>Thank you for registering for our <strong>{{ $courseName }}</strong> bootcamp. We're excited to have you join our community of tech innovators!</p>
        
        <div class="credentials">
            <h2>Your Login Credentials</h2>
            <div class="info-item">
                <span class="info-label">Student ID:</span> {{ $studentId }}
            </div>
            <div class="info-item">
                <span class="info-label">Password:</span> {{ $password }}
            </div>
            <div class="info-item">
                <span class="info-label">Platform:</span> Online
            </div>
        </div>
        
        <p><strong>Note:</strong> Your student ID serves as both your username and password for our learning platform.</p>
        
        <!-- <a href="https://learning.skilfusionacademy.com" class="cta-button">
            Access Learning Platform
        </a> -->
        
        <p>We're committed to providing you with an exceptional learning experience that will equip you with industry-relevant skills.</p>
        
        <div class="footer">
            <p>Best regards,<br>
            <strong>Skill Fusion Academy Team</strong></p>
            <p>Email: skillfusionuniversity@gmail.com<br>
            © {{ date('Y') }} SkillFusion Africa. All rights reserved.</p>
        </div>
    </div>
</body>
</html>