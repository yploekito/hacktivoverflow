mongoose = require('mongoose')

const {Schema} = mongoose
const AnswerSchema = new Schema({
    title:String,
    description:String,
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    question: { type: Schema.Types.ObjectId, ref: 'Question'},
    creator: { type: Schema.Types.ObjectId, ref: 'User'} //As an array? 
})
const Answer = mongoose.model('Answer', AnswerSchema)
module.exports = Answer