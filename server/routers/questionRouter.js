const router = require('express').Router()
const questionController = require('../controller/questionController')
const authentication = require('../middleware/authentication')

//base route localhost:3000/question
router.get('/', questionController.getAllQuestion)
router.get('/usersQuestion', authentication, questionController.getUsersQuestion)
router.get('/:id', questionController.getOneQuestion )

router.use(authentication)
router.post('/', questionController.createQuestion)
router.delete('/:id', questionController.deleteQuestion)
router.patch('/:id',  questionController.updateQuestion)
router.patch('/upvote/:id', questionController.upvote)
router.patch('/downvote/:id', questionController.downvote)
router.patch('/removeUpvoteOrDownvote/:id', questionController.removeUporDown)



module.exports = router