import RatingStars from '~/shared/components/RatingStars'

interface ProductHeaderProps {
  brandName: string
  averageRating: number
}

export default function ProductHeader({ brandName, averageRating }: ProductHeaderProps) {
  return (
    <>
      <h2 className="font-bold text-4xl leading-[140%] tracking-normal text-black">
        {brandName}
      </h2>
      <div className="flex justify-between whitespace-wrap gap-x-6 w-full">
        <RatingStars
          average={averageRating}
          reviews={15}
          interactive
          onRate={r => console.warn('#Todo: Оцінка', r)}
        />
        <p className="pt-1 font-light text-[14px] leading-[140%] items-center tracking-normal text-[var(--baseColorText)] whitespace-nowrap">
          Код: 000000000
        </p>
      </div>
    </>
  )
}
