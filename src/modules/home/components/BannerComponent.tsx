interface BannerProps {
  imageUrl: string
  bannerText?: string
}

function Banner({ imageUrl, bannerText }: BannerProps) {
  return (
    <div className="banner w-full">
      <img className="h-full w-full" src={imageUrl} alt={bannerText ?? 'Banner'} />
    </div>
  )
}

export default Banner
