import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { menu, orders, type Order } from '../data'

export const orderRoutes = new Hono()

const orderSchema = z.object({
  customer: z.string().min(2),
  itemIds: z.array(z.number().int()).min(1),
})

orderRoutes.post('/', zValidator('json', orderSchema), (c) => {
  const { customer, itemIds } = c.req.valid('json')
  const items = itemIds.map((id) => menu.find((m) => m.id === id && m.available))
  if (items.includes(undefined)) {
    return c.json({ error: 'Some items do not exist or are sold out' }, 400)
  }
  const total = items.reduce((sum, item) => sum + (item?.price ?? 0), 0)
  const order: Order = {
    id: orders.length + 1,
    customer,
    itemIds,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  orders.push(order)
  return c.json(order, 201)
})
