export const validateEmail = (email: string) => /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email) ? '' : 'Невірна електронна адреса'

export function validatePassword(password: string) {
  if (!/^[A-Z0-9!@#$%^&*(),.?":{}|<>]*$/i.test(password)) {
    return `Пароль може містити лише англійські літери, цифри та певні спеціальні символи, такі як !@#$%^&*(),.?":{}|<>`
  }
  if (password.length < 8) {
    return 'Пароль має бути не менше 8 символів'
  }
  if (!/[A-Z]/.test(password)) {
    return 'Пароль повинен містити хоча б одну велику літеру'
  }

  if (!/[a-z]/.test(password)) {
    return 'Пароль повинен містити хоча б одну малу літеру'
  }

  if (!/\d/.test(password)) {
    return 'Пароль повинен містити хоча б одну цифру'
  }

  return ''
}

export const validateName = (name: string) => name.length < 3 ? 'Ім’я повинно містити хоча б 3 символи' : ''
export const validateSurname = (surname: string) => surname.length < 3 ? 'Прізвище повинно містити хоча б 3 символи' : ''
export const validateConfirmPassword = (password: string, confirmPassword: string) => password === confirmPassword ? '' : 'Паролі не співпадають'
