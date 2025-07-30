import Card from './Card'

function CategoriesSection() {
  return (
    <section className="grid grid-cols-3 gap-x-[14px] rounded-[10px] pt-5 sm:pt-12 lg:pt-20 clamp">
      <Card imgURL="categoriesSection/ForHere.png" text="Для неї" to="/forher"></Card>
      <Card imgURL="categoriesSection/ForHim.png" text="Для нього" to="/forhim"></Card>
      <Card imgURL="categoriesSection/Accessories.png" text="Аксесуари" to="/accessories"></Card>
    </section>
  )
}

export default CategoriesSection
