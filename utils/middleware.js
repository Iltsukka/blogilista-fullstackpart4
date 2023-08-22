const tokenExtractor = (request, response, next) => {
    let authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
       authorization = authorization.replace('Bearer ', '')
       
       request.token = authorization
    } else {
        request.token = null
    }

    next()
}
// const tokenFromRequest = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//       return authorization.replace('Bearer ', '')
  
//     }
//     return null
//   }

module.exports = {tokenExtractor}