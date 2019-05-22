const Question = require('../models/question')

class questionController {
    static getAllQuestion(req, res) {
        Question
            .find()
            .populate('creator')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getOneQuestion(req, res) {
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static getUsersQuestion(req, res) {
        let id = req.decoded._id
        Question
            .findOne({ creator: ObjectId(id) } )
            .populate('creator')
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500), json(err)
            })
    }
    static createQuestion(req, res) {
        let id = req.decoded._id
        let {
            title,
            description,
        } = req.body
        Question
            .create({
                title,
                description,
                creator: id
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static deleteQuestion(req, res) {
        let questionId = req.params.id
        Question
            .findByIdAndRemove(questionId/*id*/)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static updateQuestion(req,res){
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then(question =>{
                question.set(req.body)
                return question.save()
            })
            .then(updated =>{
                res.status(200).json(updated)
            })
            .catch( err => {
                res.status(500).json(err)
            })
    }
    static upvote(req,res){
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findById(questionId)
            .then( question =>{
                if(question.downvotes.includes(id)){
                    return Question
                        .findByIdAndUpdate(questionId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else if(question.upvotes.includes(id)){
                    return Question
                        .findByIdAndUpdate(questionId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return question
                }
            })
            .then( question => {
                question.upvotes.push(id)
                return question.save()
            })
            .then( question =>{
                return Question.populate(question, {path:'creator'})
            })
            .then( upvotedQuestion =>{
                res.status(200).json(upvotedQuestion)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static downvote(req,res){
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findById(questionId)
            .populate('creator')
            .then( question =>{
                if(question.upvotes.includes(id)){
                    return Question
                        .findByIdAndUpdate(questionId,
                            {$pull:
                                {upvotes: id}
                            },
                            {new:true}
                        )
                }else if(question.downvotes.includes(id)){
                    return Question
                        .findByIdAndUpdate(questionId,
                            {$pull:
                                {downvotes: id}
                            },
                            {new:true}
                        )
                }else{
                    return question
                }
            })
            .then( question => {
                question.downvotes.push(id)
                return question.save()
            })
            .then( question=>{
                return Question.populate(question, {path:'creator'})
            })
            .then( downvotedQuestion =>{
                res.status(200).json(downvotedQuestion)
            })
            .catch( err => {
                res.status(500).json({error: err})
            })
    }
    static removeUporDown(req,res){
        let id = req.decoded._id
        let questionId = req.params.id
        Question
            .findByIdAndUpdate(questionId,
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
module.exports = questionController