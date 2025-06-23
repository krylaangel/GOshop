import styles from './characteristics.module.css'

interface CharacteristicRowProps {
  label: string
  values: string[]
}
export default function CharacteristicRow({
  label,
  values,
}: CharacteristicRowProps) {
  return (
    <>
      <div className={styles.nameItemsColumBlock}>
        <p className="pr-5 whitespace-nowrap">{label}</p>
        <div className={styles.borderColum}></div>
      </div>
      <p className={`${styles.valueItemColumBlock} min-w-0`}>
        {values.map((v, i) => (
          <span className="block whitespace-nowrap" key={i}>
            {v}
          </span>
        ))}
      </p>
    </>
  )
}
