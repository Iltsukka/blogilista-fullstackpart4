const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
    return res.status(400).send({error: 'title or url missing'})
    }
    next(error)
}

module.exports = errorHandler