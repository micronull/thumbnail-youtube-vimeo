# JS Thumbnails youtube and vimeo

### Installation

```sh
$ npm install thumbnail-youtube-vimeo
```

### Use

```js
var thumbnailYoutubeVimeo = require('thumbnail-youtube-vimeo');

thumbnailYoutubeVimeo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    .then(
        result => {console.log(result)/* //img.youtube.com/vi/dQw4w9WgXcQ/0.jpg */},
        err => {console.error(err)}
    );
```