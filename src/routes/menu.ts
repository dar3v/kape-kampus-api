import { Hono } from 'hono'
import { menu } from '../data'

export const menuRoutes = new Hono()

menuRoutes.get('/', (c) => {
  const onlyAvailable = c.req.query('available') === 'true'
  return c.json(onlyAvailable ? menu.filter((m) => m.available) : menu)
})

menuRoutes.get('/:id', (c) => {
  const item = menu.find((m) => m.id === Number(c.req.param('id')))
  if (!item) return c.json({ error: 'Item not found' }, 404)
  return c.json(item)
})
