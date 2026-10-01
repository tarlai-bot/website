// Email Service for Rental Inquiries
// This is a template - you'll need to implement the actual backend API

interface RentalInquiryData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  businessType: string;
  message: string;
  selectedSpaces: string[];
}

/**
 * Send rental inquiry email
 *
 * Backend Implementation Options:
 * 1. Node.js with Nodemailer
 * 2. SendGrid API
 * 3. AWS SES (Simple Email Service)
 * 4. Firebase Functions with email service
 * 5. Your existing backend email system
 */
export async function sendRentalInquiry(
  data: RentalInquiryData
): Promise<boolean> {
  try {
    const emailContent = formatRentalEmail(data);

    // Option 1: Call your backend API
    const response = await fetch("/api/send-rental-inquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "rentals@alamermall.com",
        subject: "New Rental Inquiry - Alamer Mall",
        htmlContent: emailContent.html,
        textContent: emailContent.text,
        replyTo: data.email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    // Also send confirmation email to the user
    await sendConfirmationEmail(data.email, data.fullName);

    return true;
  } catch (error) {
    console.error("Error sending rental inquiry:", error);
    throw error;
  }
}

/**
 * Format rental inquiry email
 */
function formatRentalEmail(data: RentalInquiryData) {
  const text = `
New Rental Inquiry Received - Alamer Mall

CONTACT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${data.fullName}
Email:        ${data.email}
Phone:        ${data.phone}
Company:      ${data.companyName || "Not provided"}
Business Type: ${data.businessType}

SELECTED SPACES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.selectedSpaces.join("\n")}

MESSAGE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.message || "No additional message provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted on: ${new Date().toLocaleString("en-US", {
    timeZone: "Asia/Riyadh",
    dateStyle: "full",
    timeStyle: "long",
  })}
  `;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Rental Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">New Rental Inquiry</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0;">Alamer Mall - Rental Management</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Information</h2>
    <table style="width: 100%; margin-bottom: 20px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td>
        <td style="padding: 8px 0;">${data.fullName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0;"><a href="mailto:${
          data.email
        }" style="color: #667eea;">${data.email}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0;"><a href="tel:${
          data.phone
        }" style="color: #667eea;">${data.phone}</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Company:</td>
        <td style="padding: 8px 0;">${
          data.companyName || "<em>Not provided</em>"
        }</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Business Type:</td>
        <td style="padding: 8px 0;">${data.businessType}</td>
      </tr>
    </table>

    <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Selected Spaces</h2>
    <ul style="background: white; padding: 20px 40px; border-radius: 5px; margin-bottom: 20px;">
      ${data.selectedSpaces
        .map((space) => `<li style="padding: 5px 0;">${space}</li>`)
        .join("")}
    </ul>

    ${
      data.message
        ? `
      <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Additional Message</h2>
      <div style="background: white; padding: 20px; border-radius: 5px; margin-bottom: 20px; white-space: pre-wrap;">
        ${data.message}
      </div>
    `
        : ""
    }

    <div style="background: #667eea; color: white; padding: 15px; border-radius: 5px; text-align: center; margin-top: 30px;">
      <p style="margin: 0; font-size: 12px;">Submitted on ${new Date().toLocaleString(
        "en-US",
        {
          timeZone: "Asia/Riyadh",
          dateStyle: "full",
          timeStyle: "long",
        }
      )}</p>
    </div>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
    <p>Alamer Mall - Rental Management Department</p>
    <p>This is an automated message from the website inquiry form</p>
  </div>
</body>
</html>
  `;

  return { text, html };
}

/**
 * Send confirmation email to the user
 */
async function sendConfirmationEmail(
  email: string,
  name: string
): Promise<boolean> {
  try {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Thank You for Your Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
    <p style="color: #e0e7ff; margin: 10px 0 0 0;">We've received your rental inquiry</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Dear ${name},</p>
    
    <p>Thank you for your interest in Alamer Mall's rental opportunities. We have received your inquiry and our rental management team will review it shortly.</p>
    
    <div style="background: white; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 5px;">
      <h3 style="margin-top: 0; color: #667eea;">What happens next?</h3>
      <ol style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 10px;">Our team will review your inquiry and the spaces you're interested in</li>
        <li style="margin-bottom: 10px;">We'll contact you within 24-48 business hours</li>
        <li style="margin-bottom: 10px;">We can arrange a viewing of the available spaces</li>
        <li style="margin-bottom: 10px;">Discuss lease terms and answer any questions you may have</li>
      </ol>
    </div>

    <div style="background: #667eea; color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0;">
      <p style="margin: 0 0 10px 0; font-size: 14px;">Need immediate assistance?</p>
      <p style="margin: 0; font-size: 18px; font-weight: bold;">+966 12 345 6789</p>
      <p style="margin: 10px 0 0 0; font-size: 12px;">Monday - Saturday: 9:00 AM - 9:00 PM</p>
    </div>

    <p>We look forward to welcoming you to the Alamer Mall business community!</p>
    
    <p style="margin-top: 30px;">
      Best regards,<br>
      <strong>Alamer Mall Rental Management Team</strong>
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
    <p>Alamer Mall | Almubaraz, AlAhsa, Alsharqiyah, Saudi Arabia</p>
    <p>Email: rentals@alamermall.com | Phone: +966 12 345 6789</p>
  </div>
</body>
</html>
    `;

    await fetch("/api/send-confirmation-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Thank You for Your Rental Inquiry - Alamer Mall",
        htmlContent: html,
      }),
    });

    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw - confirmation email is not critical
    return false;
  }
}

// Export the main function
export default sendRentalInquiry;
