import { useAuthStore } from '~/store/useAuth'

export function PersonalData() {
  const { userData } = useAuthStore()

  return (
    <div className="flex gap-6 flex-col">
      <h2 className="w-full bg-[var(--hoverBorder)] rounded-lg p-3 ">1. Особисті данні:</h2>
      <p
        className="border rounded-lg px-3 py-2 w-full input-field input-field-styles"
      >
        {userData?.firstName ?? ''}
      </p>
      <p
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
      >
        {userData?.lastName ?? ''}
      </p>
      <p
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
      >
        {userData?.phoneNumber}
      </p>
      <p
        className="border rounded-lg px-3 py-2 input-field input-field-styles"
      >
        {userData?.email ?? ''}
      </p>
    </div>
  )
}
