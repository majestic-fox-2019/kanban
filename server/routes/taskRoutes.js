const Task = require('../controllers/taskController');
const db = require('../models');


const router = require('express').Router();

const Auth = (req,res,next)=>{
    console.log('went over auth')
    db.Task.findByPk(req.params.id, {
        include : [{
            model : db.User,
            attributes : ['email']
        }]
    })
    .then(response => {
        if(response){
            if(response.User.email === req.user.email){
                next()
            } else {
                next('unauthorized')
            }
        } else {
            next('task-not-found')
        }
    })
}

router.post('/', Task.create)
router.get('/', Task.read)
router.get('/:id',Auth, Task.readOne)
router.put('/:id',Auth, Task.update)
router.delete('/:id',Auth, Task.delete)

module.exports = router