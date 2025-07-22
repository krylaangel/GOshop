import type { Review } from '~/api/types'
import SkeletonUserName from '@product/skeleton/SkeletonUserName'
import { useEffect, useState } from 'react'
import { authService } from '~/api/services/authService'
import RatingStars from '~/shared/components/RatingStars'
import styles from './reviews.module.css'

export default function ReviewsCard({ review }: { review: Review }) {
  const { userId, rating, comment, createdAt } = review

  const [user, setUser] = useState<{ firstName: string, lastName: string } | null>(null)
  const [error, setError] = useState<boolean>(false)
  useEffect(() => {
    let mounted = true
    if (!userId) {
      setError(true)
      return
    }
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
      <div className="flex justify-between flex-col sm:flex-row ">
        <h1 className="font-medium text-lg leading-[140%] mr-2 whitespace-nowrap">
          {user ? `${user.firstName} ${user.lastName}` : error ? 'Користувача не знайдено' : <SkeletonUserName />}
        </h1>
        <p className="font-light text-sm leading-[140%] text-[var(--baseColorText)] whitespace-nowrap">
          {new Date(createdAt).toLocaleDateString('uk-UA', {
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
