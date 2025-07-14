import InputField from '@shared/components/InputField'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '~/shared/components/Button/Button'
import { validateConfirmPassword, validateEmail, validateName, validatePassword, validateSurname } from '~/shared/utils/validators'
import { useAuth } from '../hooks/useAuth'

interface RegisterFormProps {
  onNavigate: (state: 'login' | 'emailSent') => void
}

interface Errors {
  email: string
  name: string
  surname: string
  password: string
  confirmPassword: string
  termsAccepted: string
  submit?: string
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Errors>({
    email: '',
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    termsAccepted: '',
    submit: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      name: validateName(formData.name),
      surname: validateSurname(formData.surname),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
      termsAccepted: formData.termsAccepted ? '' : 'Ви повинні погодитися з Політикою конфіденційності, щоб продовжити',
    }
    setErrors(newErrors)
  }

  useEffect(() => {
    validateForm()
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    signUp(formData.email, formData.password, formData.name, formData.surname)
      .then(() => {
        onNavigate('emailSent')
      })
      .catch((err) => {
        console.error(err)
        if (err) {
          setErrors(prev => ({
            ...prev,
            submit: err.message || 'Помилка реєстрації',
          }))
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const isFormValid = !Object.values(errors).some(error => error) && formData.termsAccepted

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-[30px]">
      <InputField
        name="email"
        type="email"
        placeholder="Електронна пошта*"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        name="name"
        type="text"
        placeholder="Ім'я*"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
      />

      <InputField
        name="surname"
        type="text"
        placeholder="Прізвище*"
        value={formData.surname}
        onChange={handleChange}
        error={errors.surname}
      />

      <InputField
        name="password"
        type="password"
        placeholder="Пароль*"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <InputField
        name="confirmPassword"
        type="password"
        placeholder="Повторити пароль*"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
      />
      <div className="">
        <div className="flex gap-1 w-full">
          <label className="">
            <input
              className="cursor-pointer mt-1 appearance-none checked:appearance-auto h-[16px] w-[16px] min-h-[16px] min-w-[16px] block m-0 border border-gray-300 rounded-sm accent-black bg-white"
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
          </label>
          <p className="font-light text-[9px] sm:text-[10px] text-left py-1 justify-start w-full items-center">
            Я погоджуюся з
            {' '}
            <span className="underline cursor-pointer" onClick={() => navigate('/privacyPolicy')}>Політикою конфіденційності</span>
            {' '}
            та
            {' '}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate('/userAgreement')}
            >
              Умовами використання
            </span>
          </p>
        </div>

        {errors.termsAccepted
          && <p className="text-left p-1 mt-1 sm:mt-0 ml-4 min-h-[14px] bg-[var(--errorLabel)] text-[10px] font-light">{errors.termsAccepted}</p>}
      </div>

      <Button
        variant="primary"
        disabled={isSubmitting && !isFormValid}
        className="button__auth"
      >
        {isSubmitting ? 'Реєстрація...' : 'Зареєструватись'}
      </Button>
      {errors.submit && <p className="error__auth">{errors.submit}</p>}
      <Button
        onClick={() => onNavigate('login')}
        variant="tertiary_light"
        className="link w-full text-sm"
      >
        Увійти
      </Button>
    </form>
  )
}

export default RegisterForm
