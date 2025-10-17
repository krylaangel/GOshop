import { authService } from '@api/services/authService'
import Button from '@shared/components/Button/Button'
import InputField from '@shared/components/InputField'
import { useState } from 'react'
import {
  validateName,
  validatePhone,
  validateSurname,
} from '~/shared/utils/validators'
import { useAuthStore } from '~/store/useAuth'

interface Errors {
  name?: string
  surname?: string
  phoneNumber?: string
}

export function PersonalDates() {
  const { userData, setUserData, user } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Errors>({
    name: '',
    surname: '',
    phoneNumber: '',
  })
  const [formData, setFormData] = useState({
    firstName: userData?.firstName ?? '',
    lastName: userData?.lastName ?? '',
    phoneNumber: userData?.phoneNumber ?? '',
  })

  if (!userData)
    return null
  const handleSave = async () => {
    const newErrors: Errors = {
      name: validateName(formData.firstName),
      surname: validateSurname(formData.lastName, formData.firstName),
      phoneNumber: validatePhone(formData.phoneNumber),
    }
    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean))
      return

    setIsSaving(true)
    try {
      const response = await authService.updatePublicUserInfo({
        id: userData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      }, user?.token ?? '')

      if (!response.isError && response.data) {
        setUserData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
        })
      }
      else {
        console.error('Помилка при оновленні даних', response.errorMessage)
      }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3">Особисті данні:</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSave()
        }}
        className="space-y-[30px]"
      >
        <InputField
          name="name"
          type="text"
          placeholder="Ім'я*"
          value={formData.firstName ?? ''}
          onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          error={errors.name}
        />
        <InputField
          name="surname"
          type="text"
          placeholder="Прізвище*"
          value={formData.lastName ?? ''}
          onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          error={errors.surname}
        />
        <InputField
          name="phoneNumber"
          type="text"
          placeholder="Телефон*"
          value={formData.phoneNumber ?? ''}
          onChange={e => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
          error={errors.phoneNumber}
        />
        <div
          className="py-2 text-[var(--baseColorText)] flex flex-wrap items-center gap-2"
        >
          <p>Ваш email:</p>
          {' '}
          <p>{userData?.email ?? ''}</p>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
          disabled={isSaving}
        >
          {isSaving ? 'Зберігаємо...' : 'Зберегти'}
        </Button>
      </form>

    </div>

  )
}
