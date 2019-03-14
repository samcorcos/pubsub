const express = require('express')
const http = require('http')
const Faye = require('faye')
const port = 8000

const app = express()
const server = http.createServer(app)

const data = {
  foo: 'bar'
}

const client = new Faye.Client('http://localhost:8000')

// when I ping this, it updates the data and publishes to all subscribers
// GET http://localhost:3030/ping
app.get('/ping', (req, res) => {
  data[Date.now()] = true
  client.publish('/messages', {
    ...data
  })
  res.send('Hello World!')
})

const bayeux = new Faye.NodeAdapter({ mount: '/' })

bayeux.on('handshake', function (clientId) {
  console.log('Client connected', clientId)
})

bayeux.attach(server)
app.listen(3030, () => {
  console.log('Express on port 3030?')
})
server.listen(port, function () {
  console.log('Listening on ' + port)
})
