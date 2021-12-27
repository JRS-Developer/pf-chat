const notFound = (req, res, next) => {
    return res.status(404).json({ msg: "Doesn't exist this endpoint, try a valid endpoint"})
  };

module.exports = notFound