export const validateEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validatePhone = (value: string): boolean => {
  const phoneRegex = /^\+?[0-9]{6,}$/;
  return phoneRegex.test(value);
};

export const validateUsername = (
  value: string,
  t: (key: string) => string
): { isValid: boolean; message: string } => {
  if (!value) {
    return {
      isValid: false,
      message: t('login.login_form.validation.username_required'),
    };
  }

  if (validateEmail(value) || validatePhone(value)) {
    return { isValid: true, message: '' };
  }

  return {
    isValid: false,
    message: t('login.login_form.validation.username_invalid'),
  };
};

export const validatePassword = (
  value: string,
  t: (key: string) => string,
  isInitialReset: boolean = false
): { isValid: boolean; message: string } => {
  if (!value) {
    return {
      isValid: false,
      message: t('login.login_form.validation.password_required'),
    };
  }

  if (isInitialReset) {
    if (value.length < 6) {
      return {
        isValid: false,
        message: t('login.password_reset.validation.password_length'),
      };
    }

    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\-_+=/\\[\]~`]/.test(value);

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      return {
        isValid: false,
        message: t('login.password_reset.validation.password_complexity'),
      };
    }
  }

  return { isValid: true, message: '' };
};

export const validateMLString = (
  mlString:
    | { languageKeys: string[]; languageTexts: string[] }
    | null
    | undefined,
  allowedKeys: string[]
): boolean => {
  if (!mlString || !mlString.languageKeys || !mlString.languageTexts) {
    return false;
  }

  // For each allowed key, check if there's a corresponding non-empty text
  return allowedKeys.every((key) => {
    const index = mlString.languageKeys.indexOf(key);
    return index !== -1 && mlString.languageTexts[index]?.trim();
  });
};
