const {User} = require("../models")
const {comparePassword} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class userController{
    static register(req, res, next) {
        const {email, password} = req.body
        User.create({email, password})
        .then(user => {
            const {id, email} = user
            res.status(201).json({id, email})
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        const {email, password} = req.body
        User.findOne({where: {email}})
        .then(user => {
            if (!user) {
                next({name: "Email/Password Invalid"})
            } else {
                let match = comparePassword(password, user.password)
                console.log(match)
                if (!match) {
                    next({name: "Email/Password Invalid"})
                } else {
                    const {id, email} = user
                    const access_token = generateToken({id, email})
                    res.status(200).json({access_token, id})
                }
            }
        })
        .catch(err => {
            next(err)
        })
        
    }

}

module.exports = userController