import Card from './Card'

function CategoriesSection() {
    return (
        <section className="clamp">
            <div className="grid grid-cols-3 gap-x-[14px] rounded-[10px] py-5 sm:py-12">
                <Card imgURL="categoriesSection/ForHere.png" text="Для неї"></Card>
                <Card imgURL="categoriesSection/ForHim.png" text="Для нього"></Card>
                <Card imgURL="categoriesSection/Accessories.png" text="Аксесуари"></Card>
            </div>
        </section>
    )
}

export default CategoriesSection
