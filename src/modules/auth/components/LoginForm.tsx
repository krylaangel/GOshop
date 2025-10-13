import Button from '@shared/components/Button/Button'
import InputField from '@shared/components/InputField'
import React, { useState } from 'react'
import { useAuthStore } from '~/store/useAuth'

function LoginForm({
  onNavigate,
}: {
  onNavigate: (state: 'register' | 'recovery') => void
}) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn, isLoading } = useAuthStore()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await signIn(formData.email, formData.password)
    }
    catch (err: any) {
      setError(err.message)
    }
    finally {
      setIsSubmitting(false)
    }
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
