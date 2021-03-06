const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { Schema } = mongoose
const UserSchema = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        validate:
            [{
                validator: function (email) {
                    return new Promise(function (resolve, reject) {
                        User.findOne({ email: email })
                            .then(result => {
                                // console.log(_id, 'sini')
                                if (result) {
                                    resolve(false)
                                } else {
                                    resolve(true)
                                }
                            })
                            .catch(err => {
                                reject(err)
                            })
                    })
                },
                message: props => `${props.value} Email already taken`
            }, {
                validator: function validateEmail(email) {
                    var regex = /\S+@\S+\.\S+/;
                    return regex.test(email);
                },
                message: props => `this email: ${props.value} is not valid`
            }]
    }
})

UserSchema.pre('save', function (next) {
    let user = this
    let salt = bcrypt.genSaltSync(8)
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User