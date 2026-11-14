import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { menu, orders, type Order } from './data'

const app = new Hono()

app.get('/', (c) => c.text('Kape Kampus API is open!'))

app.get('/menu', (c) => {
  const onlyAvailable = c.req.query('available') === 'true'
  return c.json(onlyAvailable ? menu.filter((m) => m.available) : menu)
})

app.get('/menu/:id', (c) => {
  const id = Number(c.req.param('id'))
  const item = menu.find((m) => m.id === id)
  if (!item) return c.json({ error: 'Item not found' }, 404)
  return c.json(item)
})

const orderSchema = z.object({
  customer: z.string().min(2),
  itemIds: z.array(z.number().int()).min(1),
})

app.post('/orders', zValidator('json', orderSchema), (c) => {
  const { customer, itemIds } = c.req.valid('json')

  // business rule: every item must exist and be available
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

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Running on http://localhost:${info.port}`)
})
