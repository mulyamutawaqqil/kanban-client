const {checkToken} = require("../helpers/jwt")
const {User, Task} = require("../models")

function authentication(req, res, next) {
    const authParams = checkToken(req.headers.access_token)
    User.findOne({where: {email: authParams.email}})
    .then(user => {
        if (!user) {
            next({name: 'emailInvalid'})
        } else {
            req.user = user
            next()
        }
    })
    .catch(err => {
        next(err)
    })

}

function authorization(req, res, next) {
    const UserId = req.user.id
    Task.findByPk(+req.params.id)
    .then(Task => {
        if (!Task) {
            next({name: 'requestNotFound'})
        } else {
            if (Task.UserId === UserId) {
                next()
            } else {
                next({name: 'accessDenied'})
            }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {authentication, authorization}