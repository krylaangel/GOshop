import getImageURL from "@shared/utils/imageUtils";

export interface SuccessMessageProps {
  successMessage: string
}
export function Success({ successMessage }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50  bg-black/70 h-full w-full flex-center">
      <div
          className="flex items-center justify-center flex-col gap-y-4 p-6 rounded-lg m-2"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(2, 0, 66, 0.1), rgba(2, 0, 66, 0.3)),
            url(${getImageURL('aut-img.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
      ><p className="text-white">{successMessage}</p>
          </div>
    </div>
  )
}
