import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const clientsSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    ip_address: {
        type: String,
        trim: true
    },
    credit_card: {
        type: String,
        trim: true
    }
});

const Clients = model('Clients', clientsSchema)


export default Clients;


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