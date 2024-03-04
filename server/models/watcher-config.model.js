import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const WatcherConfigSchema = new Schema({
    param: {
        type: String,
        maxlenght: 150
    },
    status: {
        type: Boolean
    }
} );


const WatcherConfig = mongoose.model('WatcherConfig', WatcherConfigSchema)
//const WatcherConfig = mongoose.model('WatcherConfig', WatcherConfigSchema, 'WatcherConfig')

export default WatcherConfig;