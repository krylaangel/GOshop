import Card from './Card'

function CategoriesSection() {
  return (
    <section className="grid grid-cols-3 gap-x-[14px] rounded-[10px] py-5 sm:py-12 clamp">
      <Card imgURL="categoriesSection/ForHere.png" text="Для неї"></Card>
      <Card imgURL="categoriesSection/ForHim.png" text="Для нього"></Card>
      <Card imgURL="categoriesSection/Accessories.png" text="Аксесуари"></Card>
    </section>
  )
}

export default CategoriesSection
