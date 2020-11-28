const e = require('express');
const express = require('express');
const shortId = require('shortid');
const mongoose = require('mongoose');
const createHttpError = require('http-errors');
const path = require('path')
const app = express();
const ShortUrl = require('./models/model');
require('dotenv').config()
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
mongoose.connect(process.env.DB, {
    dbName: 'lenk-cf',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log('Mongoose is connected '))
    .catch((error) => console.log("Error"))

    app.set('view engine', 'ejs')

    app.get('/', async (req, res, next) => {
      res.render('index')
    })
    
    app.post('/', async (req, res, next) => {
      try {
        const { url } = req.body
        if (!url) {
          throw createHttpError.BadRequest('Provide a valid url')
        }
        const urlExists = await ShortUrl.findOne({ url })
        if (urlExists) {
          res.render('index', {
            // short_url: `${req.hostname}/${urlExists.shortId}`,
            short_url: `${req.headers.host}/${urlExists.shortId}`,
          })
          return
        }
        const shortUrl = new ShortUrl({ url: url, shortId: shortId.generate() })
        const result = await shortUrl.save()
        res.render('index', {
           /* short_url: `${req.hostname}/${result.shortId}`, */
           short_url: `${req.headers.host}/${result.shortId}`, 
          
        })
        
      } catch (error) {
        next(error)
      }
    })
    
    app.get('/:shortId', async (req, res, next) => {
      try {
        const { shortId } = req.params
        const result = await ShortUrl.findOne({ shortId })
        if (!result) {
          throw createHttpError.NotFound('Short url does not exist')
        }
        res.redirect(result.url)
      } catch (error) {
        next(error)
      }
    })
//extra
app.set('trust proxy', true); 
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

// rest of this is just a demo
app.use((req, res, next) => {
  res.send(`HTTPS: ${req.secure}`); 
  next();
});
    //extra end
    app.use((req, res, next) => {
      next(createHttpError.NotFound())
    })
    
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.render('index', { error: err.message })
    })
    
    app.listen(process.env.PORT || 8000, () => {
      console.log('Listening on port 8000');
    })
