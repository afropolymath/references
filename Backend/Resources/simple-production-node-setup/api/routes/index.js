module.exports = (app) => {
  app.use('/api/books', require('./books'))
}