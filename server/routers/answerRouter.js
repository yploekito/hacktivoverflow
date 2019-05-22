const router = require('express').Router()
const answerController = require('../controller/answerController')
const authentication = require('../middleware/authentication')
// baseRoute localhost:3000/answers
router.get('/usersAnswer', authentication, answerController.getUsersAnswer)

router.get('/:questionId', answerController.getAnswersOfOneQuestion)
router.use(authentication)
router.post('/:questionId', answerController.createAnswer)
router.delete('/:id', answerController.deleteAnswer)
router.patch('/:id', answerController.updateAnswer)
router.patch('/upvote/:id', answerController.upvote)
router.patch('/downvote/:id', answerController.downvote)
router.patch('/removeUpvoteOrDownvote/:id', answerController.removeUporDown)
module.exports = router