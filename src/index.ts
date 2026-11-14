import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { menu } from './data'

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

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Running on http://localhost:${info.port}`)
})
