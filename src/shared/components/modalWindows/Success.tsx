import getImageURL from '@shared/utils/imageUtils'

export interface SuccessMessageProps {
  successMessage: string
  onClose: () => void
}

export function Success({ successMessage, onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 h-full w-full flex-center">
      <div
        className="relative flex items-center justify-center flex-col gap-y-4 p-6 rounded-lg m-2"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-2xl font-semibold hover:text-[var(--secondarColorMenu)] leading-none"
          aria-label="Close"
        >
          x
        </button>

        <p className="text-white text-center p-2">{successMessage}</p>
      </div>
    </div>
  )
}
