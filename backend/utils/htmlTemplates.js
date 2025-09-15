// Template 1: Simple verification email
const verificationEmailTemplateSimple = (link) => `
  <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background-color: #f9f9f9;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 25px; border-radius: 8px; border: 1px solid #e0e0e0;">
      
      <h2 style="color: #333; margin-bottom: 15px;">Email Verification</h2>
      
      <p style="color: #555; font-size: 15px;">
        Please click the button below to verify your email address:
      </p>
      
      <a href="${link}" 
         style="display: inline-block; margin-top: 15px; padding: 10px 22px;
                background-color: #007BFF; color: #ffffff; text-decoration: none;
                font-size: 15px; border-radius: 5px;">
        Verify Email
      </a>
    </div>
  </div>
`;

// Template 2: Styled verification email
const verificationEmailTemplateStyled = (link) => `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px; text-align: center;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <h2 style="color: #333333; margin-bottom: 20px;">Verify Your Email</h2>
      
      <p style="color: #555555; font-size: 16px; line-height: 1.5;">
        Thank you for signing up! Please click the button below to verify your email address.
      </p>
      
      <a href="${link}" 
         style="display: inline-block; margin-top: 25px; padding: 12px 24px; 
                background-color: #4CAF50; color: #ffffff; text-decoration: none; 
                font-size: 16px; border-radius: 6px; font-weight: bold;">
        Verify Email
      </a>
    </div>
  </div>
`;

// Template 3: Reset Password
const resetPasswordEmailTemplate = (link) => `
  <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 30px; text-align: center;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
      
      <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
      
      <p style="color: #555; font-size: 15px; line-height: 1.5;">
        You requested to reset your password. Click the button below to set a new password.
      </p>
      
      <a href="${link}" 
         style="display: inline-block; margin-top: 20px; padding: 12px 24px;
                background-color: #FF5722; color: #ffffff; text-decoration: none;
                font-size: 15px; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
    </div>
  </div>
`;

module.exports = {
  verificationEmailTemplateSimple,
  verificationEmailTemplateStyled,
  resetPasswordEmailTemplate,
};