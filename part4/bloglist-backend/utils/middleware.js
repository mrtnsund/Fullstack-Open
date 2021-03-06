
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name) {
    return response.status(400).send({ error: error.message })
  } if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const token = request.get('authorization')
  if (token) {
    request.token = token.substring(7)
  }
  next()
}

module.exports = {
  unknownEndpoint, errorHandler, tokenExtractor,
}
