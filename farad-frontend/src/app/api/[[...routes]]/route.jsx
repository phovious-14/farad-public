/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { createSystem } from 'frog/ui'
import axios from "axios"
const { Image } = createSystem()

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: "farad",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: process.env.NEYNAR_API })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/ad/:image', async (c) => {
  const { buttonValue, inputText, status } = c
  const image = c.req.param("image")

  return c.res({
    image: <Image src={`https://gateway.pinata.cloud/ipfs/${image}`} alt="" height="70%" objectFit='contain' />
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
