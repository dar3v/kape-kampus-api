import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Kape Kampus API is open!'))

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Running on http://localhost:${info.port}`)
})
