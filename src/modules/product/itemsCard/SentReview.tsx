import { reviewService } from '@api/services/reviewService'
import { useProductContext } from '@product/ProductContext'
import Button from '@shared/components/Button/Button'
import InputField from '@shared/components/InputField'
import RatingStars from '@shared/components/RatingStars'
import React, { useState } from 'react'
import { useAuthStore } from '~/store/useAuth'
import { useModalStore } from '~/store/useModalStore'

export function SentReview() {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { isAuthenticated, userData } = useAuthStore()
  const { open } = useModalStore()
  const [rating, setRating] = useState<number>(0)
  const { product } = useProductContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) {
      alert('Будь ласка, оберіть рейтинг')
      return
    }
    if (!userData) {
      console.log('No user found')
      return
    }
    try {
      setIsSubmitting(true)
      await reviewService.add({
        userId: userData.id,
        productId: product.id,
        rating,
        comment,
      })
      setComment('')
      setRating(0)
      setShowForm(false)
    }
    catch (err: any) {
      console.error('Помилка при створенні відгуку:', err.message)
    }
    finally { setIsSubmitting(false) }
  }
  const handleShowForm = () => {
    if (!isAuthenticated) {
      open('auth')
      return
    }
    setShowForm(true)
  }
  return (
    <div className="pb-6">
      <div className="flex w-full justify-between flex-wrap gap-2">
        <p className="text-base md:text-xl font-normal">Залиште свій відгук про товар</p>
        {!showForm && (
          <Button className="w-[248px] flex gap-x-2" variant="secondary" onClick={handleShowForm}>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
            >
              <path
                d="M19 19.0385L15.4615 15.5H1.80775C1.30258 15.5 0.875 15.325 0.525 14.975C0.175 14.625 0 14.1974 0 13.6923V2.30775C0 1.80258 0.175 1.375 0.525 1.025C0.875 0.675 1.30258 0.5 1.80775 0.5H17.1923C17.6974 0.5 18.125 0.675 18.475 1.025C18.825 1.375 19 1.80258 19 2.30775V19.0385ZM1.80775 14H16.1L17.5 15.3848V2.30775C17.5 2.23075 17.4679 2.16025 17.4038 2.09625C17.3398 2.03208 17.2693 2 17.1923 2H1.80775C1.73075 2 1.66025 2.03208 1.59625 2.09625C1.53208 2.16025 1.5 2.23075 1.5 2.30775V13.6923C1.5 13.7692 1.53208 13.8398 1.59625 13.9038C1.66025 13.9679 1.73075 14 1.80775 14Z"
                fill="#586994"
              />
            </svg>
            Залишити відгук
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="pt-4">
          <RatingStars interactive average={rating} onRate={setRating} className="py-2" />
          <p className="pb-6 text-[var(--secondarColorMenu)] font-light text-sm">Оцініть товар від 1 до 5</p>
          <div className="h-[94px] mb-5">
            <InputField
              type="text"
              name="comment"
              placeholder="Ваш відгук про товар"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full gap-2 flex-wrap">
            {' '}
            <Button type="submit" className="w-[248px] flex gap-x-2" disabled={isSubmitting}>
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
              >
                <path
                  d="M19 19.0385L15.4615 15.5H1.80775C1.30258 15.5 0.875 15.325 0.525 14.975C0.175 14.625 0 14.1974 0 13.6923V2.30775C0 1.80258 0.175 1.375 0.525 1.025C0.875 0.675 1.30258 0.5 1.80775 0.5H17.1923C17.6974 0.5 18.125 0.675 18.475 1.025C18.825 1.375 19 1.80258 19 2.30775V19.0385ZM1.80775 14H16.1L17.5 15.3848V2.30775C17.5 2.23075 17.4679 2.16025 17.4038 2.09625C17.3398 2.03208 17.2693 2 17.1923 2H1.80775C1.73075 2 1.66025 2.03208 1.59625 2.09625C1.53208 2.16025 1.5 2.23075 1.5 2.30775V13.6923C1.5 13.7692 1.53208 13.8398 1.59625 13.9038C1.66025 13.9679 1.73075 14 1.80775 14Z"
                  fill="#586994"
                />
              </svg>
              {' '}
              {isSubmitting ? 'Відправляю...' : 'Опублікувати'}

            </Button>
            <Button
              type="button"
              className="w-[248px] flex gap-x-2"
              variant="secondary"
              onClick={() => setShowForm(false)}
            >
              Скасувати
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
