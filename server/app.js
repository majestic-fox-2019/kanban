'use strict'

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


const  ControlUser  = require('./controllers/useControl')
const authentication = require('./middleware/authentication')
const authorization = require('./middleware/authorization')
app.post('/register', ControlUser.register )
app.post('/login',ControlUser.login)

app.get('/',ControlUser.getTask)
app.use(authentication)

app.post('/',ControlUser.postTask)
app.get('/:id',ControlUser.findOne)
app.put('/:id',ControlUser.putTask)
app.delete('/:id',ControlUser.deleteTask)




app.use(function errorHandler(err,req,res,next){

console.log(err.errors)
  switch (err.name) {
    case "SequelizeValidationError":
      
        let dataError=[]
       err.errors.forEach(element => {
         dataError.push(element.message)
       });
       res.status(400).json({message : {dataError}})
      break
    case "NotAcceptableError":
       res.status(406).json({message : err.message})
      break;
    
    case 'JsonWebTokenError': {
        res.status(406).json({ message: err.message })
        break
    }

    case 'ForbiddenError' : {
        res.status(403).json({ message: err.message })
        break
    }
   
    case "NotFoundError":
        res.status(404).json({message : err.message})
       break;

    default:
      break;
  }
})

app.listen(PORT,()=>{
  console.log('running on port ' + PORT)
})