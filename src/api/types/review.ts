import type { UUID } from '.'

export interface Review {
  id: UUID
  productId: UUID
  userId: UUID | null
  rating: number
  comment: string | null
  createdAt: string
  lastModified: string | null
  deletedAt: string | null
}

export interface CreateReview {
  productId: UUID
  rating: number
  comment?: string
}

export interface UpdateReview extends CreateReview {
  id: UUID
}
