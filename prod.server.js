var express = require('express')
var compression = require('compression')
var config = require('./config/index')

var port = process.env.PORT || '8090'

var app = express()

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
