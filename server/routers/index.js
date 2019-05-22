const router = require('express').Router()

//routers
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')

//controllers
const userController = require('../controller/userController')

//middlewares
const authentication = require('../middleware/authentication')


// router.get('/', (req,res)=>{
//     res.send('hello')
// })
router.post('/signin', userController.signin)
router.post('/signup', userController.signup)

router.use('/questions', questionRouter)
router.use('/answers', answerRouter)



module.exports = router

