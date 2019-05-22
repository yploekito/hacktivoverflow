const Answer = require('../models/answer')
const ObjectId = require('mongoose').Types.ObjectId

class answerController {
    static createAnswer(req, res) {
        let id = req.decoded._id
        let questionId = req.params.questionId
        let { title, description } = req.body
        Answer
            .create({
                title,
                description,
                question : questionId,
                creator : id
            })
            .then( created =>{
                console.log('sini')
                return Answer.populate(created, {path:'creator'})
            })
            .then(created=>{
                console.log('sini?')
                res.status(200).json(created)
            })
            .catch( err => {
                console.log(err)
                res.status(500).json({error: err})
            })
    }
    static getUsersAnswer(req,res){
        let id = req.decoded._id
        console.log(id)
        Answer
            .find()
            .populate('creator')
            .then(answers =>{
                res.status(200).json(answers)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static getAnswersOfOneQuestion(req,res){
        let questionId = req.params.questionId
        Answer
            .find( {question: ObjectId(questionId)})
            .populate('creator')
            .then(answers=>{
                res.status(200).json(answers)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static deleteAnswer(req, res) {
        let answerId = req.params.id
        Answer
            .findByIdAndRemove(answerId/*id*/)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static updateAnswer(req,res){
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .populate('creator')
            .then(answer =>{
                answer.set(req.body)
                return answer.save()
            })
            .then(updated =>{
                res.status(200).json({data: updated})
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static upvote(req,res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .populate('creator')
            .then( answer =>{
                if(answer.downvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else if(answer.upvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return answer
                }
            })
            .then( answer => {
                answer.upvotes.push(id)
                return answer.save()
            })
            .then( answer =>{
                return Answer.populate(answer, {path:'creator'})
            })
            .then( upvotedAnswer =>{
                res.status(200).json(upvotedAnswer)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static downvote(req,res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findById(answerId)
            .then( answer =>{
                if(answer.upvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else if(answer.downvotes.includes(id)){
                    return Answer
                        .findByIdAndUpdate(answerId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return answer
                }
            })
            .then( answer => {
                answer.downvotes.push(id)
                return answer.save()
            })
            .then( answer =>{
                return Answer.populate(answer, {path:'creator'})
            })
            .then( downvotedAnswer =>{
                res.status(200).json(downvotedAnswer)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static removeUporDown(req,res){
        let id = req.decoded._id
        let answerId = req.params.id
        Answer
            .findByIdAndUpdate(answerId,
                {$pull:
                    {
                        upvotes: id,
                        downvotes: id
                    }
                },
                {new:true}
            )
            .populate('creator')
            .then( updated => {
                res.status(200).json( updated)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }
}
module.exports = answerController