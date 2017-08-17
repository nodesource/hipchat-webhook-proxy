# Hipchat webhook proxy

Hipchat webhook proxy using generic N|Solid webhook.

## Getting started

1. Click `+ Add integrations` at the right side of a Hipchat room.
2. Click `Build your own integration` button.
3. Name your integration. (e.g, N|Solid Webhook)
4. Copy the full url below:
![url](https://user-images.githubusercontent.com/5035902/29395435-b6da23ac-834b-11e7-8600-ca6d435762b2.png)
This is your `HIPCHAT_WEBHOOK_URL`

Start the webhook server by running:
```
$ HIPCHAT_WEBHOOK_URL={YOUR HIPCHAT_WEBHOOK_URL} nsolid index.js
```

or

```
$ HIPCHAT_WEBHOOK_URL={YOUR HIPCHAT_WEBHOOK_URL} node index.js
```

