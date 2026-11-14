import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { menuRoutes } from './routes/menu'
import { orderRoutes } from './routes/orders'

const app = new Hono()

app.use(logger())
app.use(cors())

// a custom one: time every request
app.use(async (c, next) => {
  const start = Date.now()
  await next()
  c.header('X-Response-Time', `${Date.now() - start}ms`)
})

app.get('/', (c) => c.text('Kape Kampus API is open!'))
app.route('/menu', menuRoutes)
app.route('/orders', orderRoutes)

app.notFound((c) => c.json({ error: 'Route not found' }, 404))

app.onError((err, c) => {
  console.error(err)
  return c.json({ error: 'Something went wrong on our end' }, 500)
})

export default app
