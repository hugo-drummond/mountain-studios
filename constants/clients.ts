export type CategorySlug = 'interiors-home' | 'food-bakery' | 'architecture' | 'hospitality' | 'other'

export type IconName = 'curtain' | 'croissant' | 'house' | 'door' | 'spark'

export interface Category {
  label: string
  color: string
  icon: IconName
}

export interface Client {
  name: string
  url: string
  category: CategorySlug
}

export const categories: Record<CategorySlug, Category> = {
  'interiors-home': { label: 'Interiors & Home', color: '#d4a574', icon: 'curtain' },
  'food-bakery': { label: 'Food & Bakery', color: '#c0392b', icon: 'croissant' },
  'architecture': { label: 'Architecture', color: '#e8a838', icon: 'house' },
  'hospitality': { label: 'Hospitality', color: '#27856a', icon: 'door' },
  'other': { label: 'Other', color: '#6366f1', icon: 'spark' },
}

export const clients: Client[] = [
  // Interiors & Home
  { name: 'BaliBlinds', url: 'https://baliblinds.co.za', category: 'interiors-home' },
  { name: 'Hout Bay Curtain Call', url: 'https://houtbaycurtaincall.co.za', category: 'interiors-home' },
  // Food & Bakery
  { name: 'Coimbra Bakery', url: 'https://coimbrabakery.co.za', category: 'food-bakery' },
  { name: 'Pie in the Sky', url: 'https://pie-in-the-sky.co.za', category: 'food-bakery' },
  // Architecture
  { name: 'Alistair Drummond Architect', url: 'https://alistairdrummondarchitect.co.za', category: 'architecture' },
]

export const categoryOrder: CategorySlug[] = [
  'interiors-home',
  'food-bakery',
  'architecture',
  'hospitality',
  'other',
]

export function getClientsByCategory(slug: CategorySlug): Client[] {
  return clients.filter((c) => c.category === slug)
}
