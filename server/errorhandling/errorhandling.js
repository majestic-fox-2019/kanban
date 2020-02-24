module.exports = (err,req,res,next)=>{
  console.log(err)
  if(err.status){
    res.status(err.status).json({error: err.message})
  }else if(err.message){
    res.status(400).json({errors: err.message.split('\n')})
  }else{
    res.status(500).json({error: `server error`})
  }
}