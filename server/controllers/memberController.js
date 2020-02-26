const { Project, ProjectUser, Task, User } = require('../models')

class MemberController {
    static deleteMember(req, res, next) {
        ProjectUser.findOne({
            where: {
                UserId: req.query.member
            }
        })
            .then(member => {
                if (!member) {
                    throw ({
                        statusCode: 404,
                        message: 'User is not on this project'
                    })
                } else {
                    return ProjectUser.destroy({
                        where: {
                            UserId: req.query.member,
                            ProjectId: req.params.projectId
                        }
                    })
                }
            })
            .then(deleted => {
                return Task.update({
                    UserId: null,
                    category: 'Back-Log'
                },{
                    where: {
                        UserId: req.query.member,
                        ProjectId: req.params.projectId
                    }
                })
            })
            .then(taskCleared => {
                res.status(200).json(req.query.member)
            })
            .catch(err => {
                next(err)
            })
    }

    static addMember(req, res, next) {
        ProjectUser.findOne({
            where: {
                UserId: req.body.userId,
                ProjectId: req.body.projectId
            }
        })
            .then(member => {
                if (member) {
                    throw ({
                        statusCode: 403,
                        message: 'Member is already in this project'
                    })
                } else {
                    return ProjectUser.create({
                        UserId: req.body.userId,
                        ProjectId: req.body.projectId
                    })
                }
            })
            .then(addedMember => {
                res.status(201).json(addedMember)
            })
            .catch(err => {
                next(err)
            })
    }

    static findAllMembers(req, res, next) {        
        ProjectUser.findAll({
            where: {
                ProjectId: req.params.projectId
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'email']
                },
                {
                    model: Project,
                    attributes: ['name']
                }
            ]
        })
            .then(projectMembers => {
                let members = []
                projectMembers.forEach(element => {
                    members.push({
                        id: element.User.id,
                        email: element.User.email
                    })
                });
                res.status(200).json({ members, projectName: projectMembers[0].Project.name })
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = MemberController