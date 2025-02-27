import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initEmailJS = (userId: string) => {
  emailjs.init(userId);
};

// Send an email using EmailJS
export const sendEmail = async (
  serviceId: string,
  templateId: string,
  templateParams: Record<string, unknown>,
  userId: string
) => {
  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, userId);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};