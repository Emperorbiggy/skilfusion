<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to SkillFusion Africa Bootcamp</title>
    <style>
        /* Base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 650px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
        }
        
        /* Header styles */
        .header {
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .logo-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 24px;
            color: #3a0ca3;
        }
        
        h1 {
            font-size: 32px;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
        }
        
        .subtitle {
            font-size: 18px;
            opacity: 0.9;
            font-weight: 400;
        }
        
        /* Content styles */
        .content {
            padding: 40px;
        }
        
        .greeting {
            font-size: 20px;
            margin-bottom: 30px;
            color: #444;
        }
        
        .credentials-card {
            background: #f8f9ff;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 30px;
            border-left: 4px solid #4361ee;
        }
        
        .card-title {
            font-size: 20px;
            color: #3a0ca3;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .card-title i {
            margin-right: 10px;
            font-size: 24px;
        }
        
        .info-item {
            display: flex;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #e0e7ff;
        }
        
        .info-label {
            font-weight: 600;
            min-width: 130px;
            color: #3a0ca3;
        }
        
        .info-value {
            font-weight: 500;
        }
        
        .bootcamp-details {
            margin-top: 35px;
        }
        
        .section-title {
            font-size: 22px;
            color: #3a0ca3;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f4ff;
        }
        
        .detail-item {
            display: flex;
            margin-bottom: 15px;
            align-items: center;
        }
        
        .detail-icon {
            width: 40px;
            height: 40px;
            background: #f0f4ff;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: #4361ee;
            font-size: 18px;
        }
        
        .detail-content h3 {
            font-size: 18px;
            margin-bottom: 5px;
            color: #444;
        }
        
        .detail-content p {
            color: #666;
        }
        
        .cta-button {
            display: block;
            background: linear-gradient(135deg, #4361ee, #3a0ca3);
            color: white;
            text-align: center;
            padding: 15px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            margin: 35px 0;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(67, 97, 238, 0.4);
        }
        
        /* Footer styles */
        .footer {
            background: #f8f9ff;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            margin: 0 15px 10px;
        }
        
        .contact-item i {
            margin-right: 8px;
            color: #4361ee;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        
        .social-link {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #eef2ff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 8px;
            color: #4361ee;
            text-decoration: none;
            font-size: 18px;
            transition: all 0.3s;
        }
        
        .social-link:hover {
            background: #4361ee;
            color: white;
            transform: translateY(-3px);
        }
        
        .copyright {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #e0e7ff;
            font-size: 13px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 600px) {
            .content {
                padding: 25px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            h1 {
                font-size: 26px;
            }
            
            .info-item {
                flex-direction: column;
            }
            
            .info-label {
                margin-bottom: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <div class="logo-container">
                <div class="logo">SFA</div>
            </div>
            <h1>Welcome to SkillFusion Africa!</h1>
            <p class="subtitle">Your Journey to Tech Excellence Begins Here</p>
        </div>
        
        <!-- Content Section -->
        <div class="content">
            <p class="greeting">Dear {{ $registration->first_name }} {{ $registration->last_name }},</p>
            
            <p>Thank you for registering for our {{ $registration->course === 'web-development' ? 'Web Development' : 'UI/UX Design' }} bootcamp. We're thrilled to have you join our community of tech innovators!</p>
            
            <!-- Credentials Card -->
            <div class="credentials-card">
                <div class="card-title">
                    <i>🔑</i> Your Login Credentials
                </div>
                
                <div class="info-item">
                    <div class="info-label">Student ID:</div>
                    <div class="info-value">{{ $studentId }}</div>
                </div>
                
                <div class="info-item">
                    <div class="info-label">Password:</div>
                    <div class="info-value">{{ $password }}</div>
                </div>
                
                <!-- <div class="info-item" style="border-bottom: none; padding-bottom: 0; margin-bottom: 0;">
                    <div class="info-label">Platform:</div>
                    <div class="info-value">https://learning.skilfusionacademy.com</div>
                </div> -->
            </div>
            
            <p><strong>Important:</strong> Please keep your credentials secure. You'll need them to access our learning platform and course materials.</p>
            
            <!-- Bootcamp Details -->
            <div class="bootcamp-details">
                <h2 class="section-title">Bootcamp Details</h2>
                
                <div class="detail-item">
                    <div class="detail-icon">📚</div>
                    <div class="detail-content">
                        <h3>Course</h3>
                        <p>{{ $registration->course === 'web-development' ? 'Web Development' : 'UI/UX Design' }} Bootcamp</p>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-icon">📅</div>
                    <div class="detail-content">
                        <h3>Start Date</h3>
                        <p>17th of August 2025</p>
                    </div>
                </div>
                
                <!-- <div class="detail-item">
                    <div class="detail-icon">⏰</div>
                    <div class="detail-content">
                        <h3>Schedule</h3>
                        <p>Mondays, Wednesdays & Fridays (7:00 PM - 9:00 PM WAT)</p>
                    </div>
                </div> -->
                
                <div class="detail-item">
                    <div class="detail-icon">💻</div>
                    <div class="detail-content">
                        <h3>Learning Platform</h3>
                        <p>All course materials, assignments, and live sessions will be accessible through our online learning platform</p>
                    </div>
                </div>
            </div>
            
           
        
        <!-- Footer Section -->
        <div class="footer">
            <p>Have questions? We're here to help!</p>
            
            <div class="contact-info">
                <div class="contact-item">
                    <i>✉️</i> skillfusionuniversity@gmail.com
                </div>
                
                <div class="contact-item">
                    <i>📱</i> +234 8147523325
                </div>
            </div>
            
            <div class="social-links">
                <a href="#" class="social-link">f</a>
                <a href="#" class="social-link">t</a>
                <a href="#" class="social-link">in</a>
                <a href="#" class="social-link">ig</a>
            </div>
            
            <div class="copyright">
                © 2025 SkillFusion Africa. All rights reserved.<br>
                This email was sent to {{ $registration->email }}. If you no longer wish to receive these emails, you can <a href="#" style="color: #4361ee;">unsubscribe</a>.
            </div>
        </div>
    </div>
</body>
</html>