import emailjs from 'emailjs-com';

// EmailJS configuration from environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_steelsyncpro';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'steelsyncpro_contact';
const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID || 'HipnufWZiuaQSArQ1';

export const sendEmail = async (templateParams: any) => {
  try {
    // Initialize EmailJS with the user ID
    emailjs.init(USER_ID);
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
};