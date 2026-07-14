export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export interface Room {
  id: string
  name: string
  slug: string
  actualPrice: number
  offerPrice: number
  description: string
  shortDescription: string
  capacity: number
  size: string | number
  bedType: string
  features: string[]
  amenities: string[]
  images: {
    main: string
    gallery: string[]
  }
  details?: {
    familyFriendly?: string[]
    roomAmenities?: string[]
    includedInSuite?: string[]
  }
}

export interface Offer {
  id: string
  title: string
  slug: string
  description: string
  validUntil: string
  actualPrice: number
  offerPrice: number
  features: string[]
  terms: string[]
  image: string
}

export interface Attraction {
  id: string
  name: string
  distance: string
  time: string
  description: string
  image: string | string[]
  mapLink: string
}
