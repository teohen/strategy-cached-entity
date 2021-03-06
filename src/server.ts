import express from 'express'
import routes from './routes/routes'

const port = 3333

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`)
})
