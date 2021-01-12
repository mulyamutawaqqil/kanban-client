const {Task, User, Organization} = require("../models")
const convertTime = require("../helpers/convertTime")

class taskController {
    static createTask(req, res, next) {
        if (!req.user.OrganizationId) {
            next({message: "please add your organization first"})
        } else {
            const name = req.body.name
            const UserId = req.user.id
            const status = 'backlog'
            const {email, OrganizationId} = req.user
            Task.create({name, status, UserId, email, OrganizationId})
            .then(task => {
                const {name, status} = task
                return res.status(201).json({name, status})})
            .catch(err => {
                next(err)
            })
        }
    }

    static showTasks(req, res, next) {
        Task.findAll({include: [User, Organization]})
        .then(tasks => {
            const output = tasks.map(el => {
                return {
                    name: el.name,
                    status: el.status,
                    email: el.User.email,
                    organization: el.Organization.name,
                    update: convertTime(el.updatedAt)
                }
            })
            res.status(200).json(output)})
        .catch(err => next(err))
    }

    static showTask(req, res, next) {
        Task.findByPk(+req.params.id, {include: [User, Organization]})
        .then(task => {
            if (task) {
                const output = {
                        name: task.name,
                        status: task.status,
                        email: task.User.email,
                        organization: task.Organization.name,
                        update: convertTime(task.updatedAt)
                    }
                res.status(200).json(output)
            } else {
                next({name: "requestNotFound"})
            }})
        .catch(err => next(err))
    }

    static updateTask(req, res) {
        const {name} = req.body
        Task.update({name}, {where: {id: +req.params.id}})
        .then(task => {
            res.status(200).json({message: "edit successfull"})})
        .catch(err => {
            next(err)
        })
    }

    static updateStatusTask (req, res) {
        const status = req.body.status
        Task.update({status}, {where: {id: +req.params.id}})
        .then(data => {
            res.status(200).json({message: "update status successfull"})})
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res) {
        Task.destroy({where: {id: +req.params.id}})
        .then(task => {
            if (task) {
                res.status(200).json({message: "Task success to delete"}) 
            } else {
                next({name: "requestNotFound"})
            }})
        .catch(err => next(err))
    }
}

module.exports = taskController