function getThumbnailURL(link, setParams) {
    var params = {
        /**
         * quality of youtube's video thumbnail. Default 0. Can be: 0 (full-size) | 1 | 2 | 3 | default | hqdefault | mqdefault | sddefault | maxresdefault (max-resolution)
         */
        ytimg: '0',
        /**
         * quality of vimeo's video thumbnail. Default large. Can be: small | medium | large
         */
        vmimg: 'large',
        patterns: [
            {regex: /youtu\.be\/([\w\-.]+)/, type: 'youtube', url: '//img.youtube.com/vi/%1'},
            {regex: /youtube\.com(.+)v=([^&]+)/, type: 'youtube', url: '//img.youtube.com/vi/%2'},
            {regex: /vimeo\.com\/([0-9]+)/, type: 'vimeo', url: '//vimeo.com/api/v2/video/%1.json'},
            {regex: /vimeo\.com\/(.*)\/([0-9]+)/, type: 'vimeo', url: '//vimeo.com/api/v2/video/%2.json'}
        ]
    };

    if (typeof setParams == 'object') {
        var n, key, keys = Object.keys(setParams);

        for (n in keys) {
            key = keys[n];

            params[key] = setParams[key];
        }
    }

    return new Promise(function(resolve, reject) {
        var type, url, pattern, match, position;

        for(var i=0; i < params.patterns.length; i++) {
            pattern = params.patterns[i];

            if ((match = link.match(pattern.regex)) && match) {
                position = pattern.url.match(/%([0-9]+)/)[1];

                type = pattern.type;
                url = pattern.url.replace(/%([0-9]+)/, match[position]);

                break;
            }
        }

        if (!type)
            reject('Not found pattern.');
        else if (type == 'youtube')
            resolve(url + '/' + params.ytimg + '.jpg');
        else if (type == 'vimeo'){
            fetch(url)
                .then(function(response){return response.json()})
                .then(function(data){resolve(data[0]['thumbnail_' + params.vmimg])})
                .catch(function(err){reject(err.statusText)})
        }
    });
}

module.exports = getThumbnailURL;
