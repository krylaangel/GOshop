import getImageURL from '~/shared/utils/imageUtils'

function OfferCard(props: { title: string, description: string }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(92, 93, 141, 0.4), rgba(92, 93, 141, 0.4)),
            url(${getImageURL('offer-section-bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className="px-5 text-white"
    >
      <h3 className="font-bold text-[32px] leading-[44.8px] pt-12 mb-6 flex text-center justify-center items-center">
        {props.title}
      </h3>
      <p className="font-light text-lg leading-[25.2px] text-start pb-12">
        {props.description}
      </p>
    </div>
  )
}

export default function OfferSection() {
  return (
    <div className="clamp">
      <h2 className="text-center text-4xl font-bold leading-[50.4px] mb-6">
        GO пропонує
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        <OfferCard
          title="Спортивний одяг та Аксесуари"
          description="GO пропонує вам ознайомитися з асортиментом жіночого, чоловічого та дитячого спортивного одягу на нашому сайті.
            Ми пропонуємо Вам величезний та широкий асортимент на будь-який смак! Це не тільки термобілизна, але й пуховики, толстовки, брюки, лосини і шорти, майки та футболки, поло і сорочки, куртки та жилетки, спортивні костюми, кепки та багато іншого!"
        />
        <OfferCard
          title="Спортивне взуття"
          description="Якщо вам потрібне якісне, перевірене професіоналами жіноче, чоловіче та дитяче спортивне взуття, спортивний інтернет-магазин SportFly може вам допомогти. Тут ви знайдете сучасне повсякденне взуття, а також кросівки для бігу, кеди, бутси, баскетбольні, тенісні та волейбольні кросівки і гірськолижні черевики. А також капці, мокасини і черевики."
        />
      </div>
    </div>
  )
}
