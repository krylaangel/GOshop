import { useAuth } from '@auth/hooks/useAuth'
import Button from '@shared/components/Button/Button'
import InputField from '@shared/components/InputField'
import React, { useState } from 'react'

function LoginForm({
  onNavigate,
}: {
  onNavigate: (state: 'register' | 'recovery') => void
}) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signIn } = useAuth()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)
    signIn(formData.email, formData.password)
      .then()
      .catch((err) => {
        if (err) {
          setError(err.message || 'Помилка авторизації')
        }
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="space-y-[30px]">
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Електронна пошта*"
        />

        <InputField
          name="password"
          type="password"
          placeholder="Пароль*"
          value={formData.password}
          onChange={handleChange}
        />
        {error && <p className="error__auth">{error}</p>}
      </div>
      <Button
        onClick={() => onNavigate('recovery')}
        variant="tertiary_light"
        className="link mt-4 text-base justify-end! w-full"
      >
        {' '}
        Забули пароль?
      </Button>
      <Button
        variant="primary"
        className="button__auth"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Входження' : 'Увійти'}
      </Button>
      <Button
        onClick={() => onNavigate('register')}
        variant="tertiary_light"
        className="link w-full text-sm"
      >
        Зареєструватись
      </Button>
    </form>
  )
}

export default LoginForm
