const images = import.meta.glob('../../assets/images/**/*', { eager: true })

export default function getImageURL(name: string): string {
  return (images[`../../assets/images/${name}`] as { default: string })?.default
}
