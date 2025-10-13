const latinRegex = /^[A-Z’'ʼ-]+(?: [A-Z’'ʼ-]+)*$/i
const cyrillicRegex = /^[А-Яа-яІіЇїЄєҐґ'’ʼ-]+(?: [А-Яа-яІіЇїЄєҐґ'’ʼ-]+)*$/

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

export const validatePhone = (phoneNumber: string) => !/^8\d{10}$/.test(phoneNumber) ? 'Телефон повинен бути в форматі 80XXXXXXXXX' : ''

export function validateName(name: string) {
  if (name.length < 2 || name.length > 50) {
    return 'Ім’я має містити від 2 до 50 символів'
  }
  if (!latinRegex.test(name) && !cyrillicRegex.test(name))
    return 'Використовуйте лише латиницю або кирилицю, без змішування символів'
  return ''
}

export function validateSurname(surname: string, name?: string) {
  if (surname.length < 2 || surname.length > 50) {
    return 'Ім’я має містити від 2 до 50 символів'
  }

  if (!latinRegex.test(surname) && !cyrillicRegex.test(surname))
    return 'Використовуйте лише латиницю або кирилицю, без змішування символів'

  if (name) {
    const nameIsLatin = latinRegex.test(name)
    const surnameIsLatin = latinRegex.test(surname)
    if (nameIsLatin !== surnameIsLatin) {
      return 'Ім’я та Прізвище повинні використовувати один і той самий набір символів (латиниця або кирилиця)'
    }
  }

  return ''
}
export const validateConfirmPassword = (password: string, confirmPassword: string) => password === confirmPassword ? '' : 'Паролі не співпадають'
