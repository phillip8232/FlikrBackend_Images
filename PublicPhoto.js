var url = 'https://www.flickr.com/services/feeds/photos_public.gne';

function log()
{
    fetch(url)
        .then(response => response.json())

    return response;
}



module.exports.log = log;
