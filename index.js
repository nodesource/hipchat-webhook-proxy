'use strict'

const HIPCHAT_WEBHOOK_URL = process.env.HIPCHAT_WEBHOOK_URL
const PORT = 8008

const http = require('http')
const request = require('request')

if (!HIPCHAT_WEBHOOK_URL) {
  console.error([
    'Environment variable (HIPCHAT_WEBHOOK_URL) is not set,',
    'please make sure you set',
    'HIPCHAT_WEBHOOK_URL',
    'env var correctly'
  ].join('\n'))
  process.exit(1)
}

console.log('Hipchat webhook sample for N|Solid')

http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhooks/hipchat') {
    let data = ''

    req.on('data', (chunk) => {
      data += chunk
    })

    req.on('end', () => {
      const body = {
        'color': 'red',
        'message': data,
        'notify': true,
        'message_format': 'text'
      }
      const options = {
        method: 'post',
        body: body,
        json: true,
        url: HIPCHAT_WEBHOOK_URL
      }

      request(options, (err) => {
        if (err) {
          console.error('Error :', err)
        }

        console.log('Sent an event message to hipchat: ' + data)
      })
    })
  } else {
    res.statusCode = 404
    res.end()
  }
}).listen(PORT)
