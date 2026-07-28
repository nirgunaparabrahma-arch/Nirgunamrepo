import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'g2dbbdc3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function run() {
  const data = await client.fetch('*[_type == "homePage"][0]')
  console.log("Fetched data:", data)
}
run()
