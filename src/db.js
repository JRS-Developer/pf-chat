const mongoose = require('mongoose')
const { dbURI } = require('./lib/config')

const connect = async () => {

  mongoose.connect(dbURI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'gaia'
    })
    .then(() => {
      console.log('DB connected! :D');
    })
    .catch((err) => {
      console.error(err);
    });

};

module.exports = {
  connect
}
