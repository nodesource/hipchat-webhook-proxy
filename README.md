# Hipchat webhook proxy

Hipchat webhook proxy using generic N|Solid webhook.

## Getting started
1. Click `+ Add integrations` at the right side of a Hipchat room.
2. Click `Build your own integration` button.
3. Name your integration as `N|Solid Webhook`
4. Copy the full URL in the text box of `"Send messages to this room by posting to this URL"` section.<br />
This is your `HIPCHAT_WEBHOOK_URL`

5. Start the webhook server by running:
```
$ HIPCHAT_WEBHOOK_URL={YOUR HIPCHAT_WEBHOOK_URL} nsolid index.js
```

or

```
$ HIPCHAT_WEBHOOK_URL={YOUR HIPCHAT_WEBHOOK_URL} node index.js
```
6. Go to `N|Solid Console` > `Application Threshold Settings`
7. Paste `http://localhost:8008/webhooks/hipchat` into `Webhook URL` text box.
![webhook](https://user-images.githubusercontent.com/5035902/29395982-c75e1658-834f-11e7-8cde-0120a8a5eae6.png)
7. Click `SAVE CHANGES` button.

## License

MIT
