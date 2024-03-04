import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema, model } = mongoose;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
    type: String,
        minlength: 6,
        required: [true, 'Введите пароль'],
    },
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Введите почту'],
        unique: true,
        lowercase: true
    },
    activationLink: {
        type: String,
        trim: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now //new Date()
    },
    updatedAt: Date,
    role: [{
        type: Schema.Types.ObjectId, //Schema.ObjectId
        ref: 'Role'
    }],
}, {
    timestaps: true
});



const Users = model('Users', usersSchema)


export default Users;


/**
 * Можно использовать для расчета пароля virtual fields предоставленые средствами mongoose
 */

/*
import { createHmac } from 'crypto';

usersSchema.virtual('password').set(function (password) {
    this._password = password
    this.salt = uuid() //добавить в схему usersSchema salt
    this.hashedPass = encryptedPass(password)
})

    .get(function () {
        return this._password
    })

usersSchema.methods = {
    encryptedPass: function (password) {
        if (!password) {
            throw new Error()
        }
        const secret = 'abcdefg';
        const hashedPass = createHmac('sha256', secret)
            .update('I love cupcakes')
            .digest('hex');
        // try/catch errors...
    }
}
 */

// salting password
// usersSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt)
// });

// compare pass
// usersSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }