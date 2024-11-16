import { functions } from './firebase';
import { httpsCallable } from 'firebase/functions';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export const sendContactForm = async (formData: ContactForm) => {
  try {
    const sendEmail = httpsCallable(functions, 'sendEmail');
    const result = await sendEmail(formData);
    
    if (!(result.data as any).success) {
      throw new Error('Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw new Error('Failed to send message. Please try again later.');
  }
};