<!DOCTYPE html>
<html>
<head>
    <title>UI/UX Design Bootcamp Admission</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 650px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f5f7fa;
        }
        .email-container {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }
        .header { 
            background-color: #4361ee; 
            padding: 30px; 
            text-align: center; 
        }
        .header h1 { 
            color: white; 
            margin: 0; 
            font-size: 28px; 
        }
        .content { 
            padding: 30px; 
        }
        .highlight-box { 
            background: #f9fbfd; 
            border-radius: 8px; 
            padding: 25px; 
            margin: 25px 0; 
            border: 1px solid #e0e7ff;
        }
        .info-item { 
            margin-bottom: 15px; 
            padding-bottom: 15px; 
            border-bottom: 1px dashed #eaeaea; 
        }
        .info-label { 
            font-weight: 600; 
            color: #4361ee; 
            min-width: 160px; 
            display: inline-block; 
        }
        .cta-button { 
            display: block; 
            background: #4361ee; 
            color: #ffffff; 
            font-size: 18px; 
            text-align: center; 
            padding: 15px; 
            border-radius: 8px; 
            text-decoration: none; 
            font-weight: 600; 
            margin: 25px 0; 
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: #3550d4;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
        }
        .link-text {
            text-align: center;
            font-size: 14px;
            color: #666;
            margin-top: -15px;
            margin-bottom: 25px;
        }
        .link-text a {
            color: #4361ee;
            word-break: break-all;
        }
        .signature { 
            margin-top: 30px; 
            border-top: 1px solid #eaeaea; 
            padding-top: 20px; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #777; 
            font-size: 14px; 
            padding: 20px;
            background: #f9fbfd;
            border-top: 1px solid #e0e7ff;
        }
        .community-section {
            background: #f0f7ff;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        .community-title {
            color: #4361ee;
            font-size: 20px;
            margin-top: 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Congratulations You're In!</h1>
        </div>
        
        <div class="content">
            <p>Hi {{ $registration->first_name }},</p>
            
            <p>Congratulations on securing your spot in the SFA Bootcamp. We're thrilled to have you join this intensive UI/UX Design journey. Below are your admission details and everything you need to prepare for classes.</p>
            
            <div class="highlight-box">
                <h2 style="color: #4361ee; margin-top: 0;">Your Admission Details</h2>
                
                <div class="info-item">
                    <span class="info-label">Admission Number:</span> 
                    {{ $registration->student_id }} <em>(Keep this handy for support queries!)</em>
                </div>
                
                <div class="info-item">
                    <span class="info-label">Full Name:</span> 
                    {{ $fullName }}
                </div>
                
                <div class="info-item">
                    <span class="info-label">Start Date:</span> 
                    Tuesday 19th August 2025
                </div>
                
                <div class="info-item" style="border-bottom: none;">
                    <span class="info-label">Class Schedule:</span> 
                    Tuesday, Thursday, Friday • 07:00pm - 09:00pm
                </div>
            </div>
            
            <div class="community-section">
                <h3 class="community-title">Join Your Design Community</h3>
                <p>Connect with instructors and fellow designers to get updates, share ideas, and collaborate.</p>
                
                <p><strong>Click the button below to join your community:</strong></p>
                
                <a href="{{ $whatsappLink }}" class="cta-button" style="color: #ffffff">
                    Join UI/UX Design Community Now
                </a>
                
                <p class="link-text">or use this link:<br>
                <a href="{{ $whatsappLink }}">{{ $whatsappLink }}</a></p>
            </div>
            
            <p>Introduce yourself! 👋 Links to classes and learning resources will be shared in the community.</p>
            
            <h3>Yes You Can Do It 💪</h3>
            <p>We're excited to see you transform your design skills and create amazing user experiences!</p>
            
            <div class="signature">
                <p>Thank you,</p>
                <p><strong>Bolanle Esther</strong><br>
                Student Support<br>
                SkillFusion Africa (SFA)</p>
            </div>
        </div>
        
        <div class="footer">
            <p>This email was sent to {{ $registration->email }}. If you have any questions, reply to this email.</p>
            <p>© {{ date('Y') }} SkillFusion Africa. All rights reserved.</p>
        </div>
    </div>
</body>
</html>