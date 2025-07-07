import type { UUID } from '~/api/types'
import { useEffect, useState } from 'react'
import { authService } from '~/api/services/authService'
import RatingStars from '~/shared/components/RatingStars'
import styles from './reviews.module.css'

export interface ReviewsProps {
  id: UUID
  productId: UUID
  userId: UUID
  rating: 5
  comment: string
  createdAt: Date
  lastModified: Date
  deletedAt: Date
}
export default function ReviewsCard({ userId, rating, comment, createdAt }: ReviewsProps) {
  const [user, setUser] = useState<{ firstName: string, lastName: string } | null>(null)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    let mounted = true
    authService.getUserById(userId).then(
      (res) => {
        if (mounted && res?.data) {
          const { firstName = '', lastName = '' } = res.data
          setUser({ firstName, lastName })
        }
        else if (mounted) {
          setError(true)
        }
      },
    ).catch(() => {
      if (mounted) {
        setError(true)
      }
    })
    return () => {
      mounted = false
    }
  }, [userId])
  return (
    <div className="border-[var(--hoverBorder)] border-b-[3px] space-y-4 pb-6">
      <div className="flex justify-between">
        <h1 className="font-medium text-lg leading-[140%]">
          {user ? `${user.firstName} ${user.lastName}` : error ? 'Користувача не знайдено' : 'Завантаження...'}
        </h1>
        {' '}
        <p className="font-light text-sm leading-[140%] text-[var(--baseColorText)]">
          {createdAt.toLocaleDateString('uk-UA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <RatingStars average={rating} />
      <p className={styles.textReviews}>
        {comment}
      </p>
    </div>
  )
}
