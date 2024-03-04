import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const roleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        default: 'user'
    }
})

const Role = model('Role', roleSchema)


export default Role;