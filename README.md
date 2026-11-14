# Kape Kampus API

A small coffee-cart order API built with Hono in eight steps. This is the companion repo for the backend portion of the AWS Student Builder Group - OCTA -- Stack Up event: you write the code yourself while the finished solution is preserved on the `solution` branch, one tagged commit per step.

## The story

Ate Mia runs Kape Kampus, a coffee cart outside the Old CCS building. Her orders come in through Messenger, shouting, and sticky notes, and she has had enough. You are going to build her a tiny API so her (future) web app can list the menu, take orders, and let her mark them as done.

## Requirements

- Node.js 20 or newer
- Git
- VS Code (or any editor)
- A way to send requests: `curl`, or the REST Client extension (`humao.rest-client`) using the `requests.http` file included in this repo

## Quick start

```bash
git clone <this repo> kape-kampus-api
cd kape-kampus-api
npm install
npm run dev
```

Then open http://localhost:3000.

## The steps

| step | tag | what you build |
| --- | --- | --- |
| 1 | `step-1-hello` | Your first Hono route: `GET /` |
| 2 | `step-2-menu` | Menu routes: list items, filter by availability, fetch one item |
| 3 | `step-3-orders` | `POST /orders`, with no validation on purpose |
| 4 | `step-4-validation` | Validate request bodies with Zod |
| 5 | `step-5-middleware` | Logger, CORS, and a custom response-time header |
| 6 | `step-6-routers` | Split the app into `menuRoutes` and `orderRoutes` |
| 7 | `step-7-auth` | Protect the owner-only routes with bearer auth |
| 8 | `step-8-final` | A `404` handler and a global error handler |

## Catching up

Fell behind? Check out the tag for the step you want to start from. The checkout discards any uncommitted local changes, so back up work you want to keep first.

```bash
git checkout -f step-3-orders
```

Replace `step-3-orders` with any tag from the table above. The `-f` flag forces checkout even though it throws away local edits.

Two things to know about catching up:

- Files that you created in a later step are not removed by `git checkout`. For example, if you practiced step 6, a stray `src/routes/menu.ts` can still be there when you catch back down to step 2. Delete files you no longer need.
- `git clean -fd` removes untracked files (but not ignored ones such as `node_modules`), so only use it when you know you want them gone.

The `solution` branch holds the finished work, one commit per step, each tagged. Use it as a reference, not as a way to skip ahead. `git switch main` returns you to the starting point.

## Troubleshooting

- **Port 3000 already in use.** Another server (or a leftover `npm run dev`) is listening. Either stop it or change the port in `src/index.ts`.
- **Node version too old.** This project needs Node 20 or newer. Run `node --version` to check. Install Node 20+ and try again.
- **Windows PowerShell and multi-line `curl`.** PowerShell mangles multi-line `curl` commands and `curl` may alias to something else. Use `curl.exe` on a single line, or install the REST Client extension and use `requests.http`.
- **Orders disappear on every file save.** Orders live in memory, so any restart (including the restart `npm run dev` does on file save) wipes them. If `PATCH /orders/1/status` says "Order not found", place a fresh order first, then patch it. For owner-route testing, `npm run start` avoids the file-watcher restarts.

## Project layout (final state)

```
src/
  index.ts          # boots the server
  app.ts            # builds the Hono app, wires middleware and routes
  data.ts           # in-memory menu and orders
  routes/
    menu.ts         # public menu routes
    orders.ts       # order-taking + owner-only routes
requests.http       # ready-made requests for the REST Client extension
```

## Next steps and homework

The natural next step is a real database: SQLite or PostgreSQL with an ORM such as Drizzle. From there: real authentication, tests using `app.request()`, deployment, and a frontend that talks to this API.

Homework to keep going on your own:

- `GET /orders/:id` for the owner
- `DELETE /orders/:id` for the owner
- `GET /orders?status=ready` to filter orders by status

One more honest note: the shared bearer token (`kape-secret`) is a teaching shortcut so the workshop stays small. It is not real authentication. Any real API needs proper auth.
