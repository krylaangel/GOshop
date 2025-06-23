import { useAuth } from '@auth/hooks/useAuth'
import Button from '@shared/components/Button/Button'
import InputField from '@shared/components/InputField'
import { validateEmail } from '@shared/utils/validators'
import { useState } from 'react'

function PasswordRecoveryForm({
  onNavigate,
}: {
  onNavigate: (state: 'login' | 'emailSent') => void
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { passwordRecovery } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    const emailError = validateEmail(email)

    if (emailError) {
      setError(emailError)
      return
    }

    setIsLoading(true)

    passwordRecovery(email)
      .then(() => onNavigate('emailSent'))
      .catch(err => setError(err.message || 'Помилка відновлення паролю'))
      .finally(() => setIsLoading(false))
  }

  return (
    <form className="space-y-[30px] w-full" onSubmit={handleSubmit}>
      <h2>Відновлення паролю:</h2>
      <div className="input-field">
        <InputField
          name="email"
          type="email"
          placeholder="Електронна пошта*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <Button variant="primary" disabled={isLoading} className="button__auth">
        {isLoading ? 'Перевірка E-mail...' : 'Відновити'}
      </Button>
      {error && <p className="error__auth">{error}</p>}
      <Button
        onClick={() => onNavigate('login')}
        variant="tertiary_light"
        className="link w-full text-sm"
      >
        Назад
      </Button>
    </form>
  )
}

export default PasswordRecoveryForm
