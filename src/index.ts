import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// Step 1 starts here

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Running on http://localhost:${info.port}`)
})
