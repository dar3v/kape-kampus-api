export type MenuItem = { id: number; name: string; price: number; available: boolean }

export type Order = {
  id: number
  customer: string
  itemIds: number[]
  total: number
  status: 'pending' | 'ready' | 'done'
  createdAt: string
}

export const menu: MenuItem[] = [
  { id: 1, name: 'Kapeng Barako', price: 60, available: true },
  { id: 2, name: 'Iced Caramel Latte', price: 95, available: true },
  { id: 3, name: 'Buko Pandan Frappe', price: 110, available: true },
  { id: 4, name: 'Ensaymada', price: 45, available: false },
]

export const orders: Order[] = []
