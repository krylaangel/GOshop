interface SkeletonTextProps {
  width?: string
  height?: string
  className?: string
}

export function SkeletonText({ width = 'w-24', height = 'h-4', className = '' }: SkeletonTextProps) {
  return <span className={`${width} ${height} bg-gray-300 rounded animate-pulse ${className}`} />
}
