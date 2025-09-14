import styles from './skeletonProduct.module.css'

function SkeletonProduct() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 clamp pb-6">
      <div className={`${styles.skeletonProduct} max-w-[500px] max-h-[500px]`}></div>
      <div className="col-span-1 gap-y-6 flex flex-col">
        <h2 className={`${styles.skeletonProduct} w-full h-[78px]`}>
        </h2>
        <div className={`${styles.skeletonProduct} w-[229px] h-[50px]`}>
        </div>
        <div className={`${styles.skeletonProduct} w-[328px] h-[76px]`}>
        </div>
        <div className={`${styles.skeletonProduct} w-[328px] h-[76px]`}>
        </div>
        <div className="flex gap-x-4">
          <div className={`${styles.skeletonProduct} w-full h-10`}></div>
          <div className={`${styles.skeletonProduct} w-[71px] h-10`}></div>

        </div>
        <div className={`${styles.skeletonProduct} w-full h-[144px]`}></div>
        <div className={`${styles.skeletonProduct} w-full h-[136px]`}></div>
        <div className={`${styles.skeletonProduct} w-full h-[136px]`}></div>
      </div>
    </div>
  )
}

export default SkeletonProduct
