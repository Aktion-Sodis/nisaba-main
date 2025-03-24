export const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validatePhone = (value: string): boolean => {
  const phoneRegex = /^\+?[0-9]{6,}$/;
  return phoneRegex.test(value);
};

export const validateUsername = (value: string): { isValid: boolean; message: string } => {
  if (!value) {
    return { isValid: false, message: 'Email or phone is required' };
  }
  
  if (validateEmail(value) || validatePhone(value)) {
    return { isValid: true, message: '' };
  }
  
  return { isValid: false, message: 'Please enter a valid email or phone number' };
};

export const validatePassword = (value: string): { isValid: boolean; message: string } => {
  if (!value) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (value.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  return { isValid: true, message: '' };
};
