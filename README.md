## nitro-emoji

### info
> minimal extension to send custom emoji (not in-line)

* click "steal" to copy emoji url with with a predefined size
  ![img describing the above info](./docs/image.png)

* saves emoji markdown using [chrome storage.sync](https://developer.chrome.com/docs/extensions/reference/storage/) 

* when emoji markdown is typed in the textbox, it is replaced with its img url if you've clicked "steal" for it before; for example, typing ``:skullcry:`` (see img above) would replace ur current input with a modified url, and visually replace the url with the image as well
* because discord doesn't support inline image embeds for users, you can only use one emoji per line, so send it in a separate text message 

*Note: it is trivial to imitate this plugin's functionality yourself -- all this plugin does is provide some degree of automation* 🙂