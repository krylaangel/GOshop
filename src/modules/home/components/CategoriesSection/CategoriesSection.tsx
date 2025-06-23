import Card from './Card'

function CategoriesSection() {
  return (
    <section className="clamp">
      <div className="grid grid-cols-3 gap-4 rounded-[10px] py-5 sm:py-12">
        <Card imgURL="categoriesSection/1.png" text="Для неї"></Card>
        <Card imgURL="categoriesSection/2.png" text="Для нього"></Card>
        <Card imgURL="categoriesSection/3.png" text="Аксесуари"></Card>
      </div>
    </section>
  )
}

export default CategoriesSection
