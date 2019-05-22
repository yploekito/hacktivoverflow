mongoose = require('mongoose')

const {Schema} = mongoose
const QuestionSchema = new Schema({
    title:String,
    description:String,
    upvotes:[ { type: Schema.Types.ObjectId, ref: 'User'}  ],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'} //As an array?
})
const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question