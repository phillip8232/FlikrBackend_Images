import fetch from 'node-fetch';
import express from 'express';

const app = express();


app.get('/', (req,res) =>
{
    const url ='https://api.flickr.com/services/feeds/photos_public.gne?tags=japan&tagmode=images&format=json';
    fetch(url)
        .then(res => res.text())
        //remove flickrfeed text o_o why is this even here
        .then(json => json.replace('jsonFlickrFeed',''))
        //removing some random stuff to so i can make it a json
        .then(json => json.replace(/[\)(]/g,''))
        //interpolate to string parse back to json format.
        .then(text => {
          const textJson = text;
          const obj = JSON.parse(textJson)
          const arrayMedia = []
          for (let i in obj.items) {
            arrayMedia.push(obj.items[i].media);
          }
          //only exposing media which contains photos
          res.send(arrayMedia);
        })
});


//port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});
