import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const companySchema = new Schema({
    title: {
        type: String,
        maxlenght: 150
    },
    field_activity: {
        type: String
    }
}, {
    timestamps: true
});


const Company = mongoose.model('Company', companySchema)
//const Company = mongoose.model('Company', companySchema, 'company')

export default Company;