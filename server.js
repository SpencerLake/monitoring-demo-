const express = require('express')
const path = require('path')
const app = express()

const Rollbar = require('rollbar')

const rollbar = new Rollbar({
    accessToken: '93a108610e01412e9a5612889adbfaea',
    captureUncaught: true,
    captureUnhandledRejections: true
})

app.use(express.json())


app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './client/index.html'))
    rollbar.info("Html was monitored successfully")
})

const studentArr = []

app.post('/api/students', (req,res) => {
    const {name} = req.body
    // const name = re.body.name These are the same but the other one is destructering
    studentArr.push(name)

    rollbar.log('Student successfully added')

    res.status(200).send(studentArr)
})

const port = process.env.PORT || 5656

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`You're up on: ${port}`))