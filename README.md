# Hipchat webhook proxy for [N|Solid](https://nodesource.com/products/nsolid)

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

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

<p align="center">or</p>

```
$ HIPCHAT_WEBHOOK_URL={YOUR HIPCHAT_WEBHOOK_URL} node index.js
```
6. Go to `N|Solid Console` > `Application Threshold Settings`
7. Paste `http://localhost:8008/webhooks/hipchat` into `Webhook URL` text box.
![webhook](https://user-images.githubusercontent.com/5035902/29395982-c75e1658-834f-11e7-8cde-0120a8a5eae6.png)
7. Click `SAVE CHANGES` button.

## Authors and Contributors

<table><tbody>
<tr><th align="left">Minwoo Jung</th><td><a href="https://github.com/JungMinu">GitHub/JungMinu</a></td><td><a href="http://twitter.com/jmwsoft">Twitter/@jmwsoft</a></td></tr>
</tbody></table>

Contributions are welcomed from anyone wanting to improve this project!

## License & Copyright

**hipchat-webhook-proxy** is Copyright (c) 2017 NodeSource and licensed under the MIT license. All rights not explicitly granted in the MIT license are reserved. See the included [LICENSE](https://github.com/nodesource/hipchat-webhook-proxy/blob/master/LICENSE) file for more details.