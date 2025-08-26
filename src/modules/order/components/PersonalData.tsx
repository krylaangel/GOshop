import { useAuthStore } from '~/store/useAuth'

export function PersonalData() {
  const { userData } = useAuthStore()

  return (
    <div className="flex gap-6 flex-col">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">1. Особисті данні:</h2>
      <input
        className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
        value={userData?.firstName ?? ''}
      />
      <input
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
        value={userData?.lastName ?? ''}
      />
      <input
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
        value={userData?.phoneNumber}
      />
      <input
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
        value={userData?.email ?? ''}
      />
    </div>
  )
}
