const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: 'ab52f6a9ff7b49029d135f57d1d3371f',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info("Html was monitored successfully")
})

const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`You're up on: ${port}`))