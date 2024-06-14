const express = require('express')
const path = require('path')
const db = require('./config/connection')
const routes = require('./controllers')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware that appends the headers on every response, to avoid issue with CORS
// https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

app.use(routes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    })
}

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`)
    })
})
