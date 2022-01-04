
const error = (err, req, res, next) => {
    console.log(err);
    return res.status(400).json(err);
  }

module.exports = error