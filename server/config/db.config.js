import mongoose from 'mongoose';
import model from './../models/index.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config()

const { DATABASE_MONGODB_URL } = process.env

// const DATABASE_MONGODB_DOCKER = `mongodb://mongo:27017`

const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(DATABASE_MONGODB_URL)

        console.log(`[MongoDB] DB connected: ${conn.connection.host}:${conn.connection.port}`.green.bold)


        // importDataToDB();
        
        console.log(`Все готово!🔥`)
    } catch (err) {
        console.error(`Error: ${err.message}🤢`.red.underline.bold)
        process.exit(1)
    }
}


const usersData = JSON.parse(fs.readFileSync('./data/users.json'))
const clientsData = JSON.parse(fs.readFileSync('./data/clients.json'))

const importDataToDB = async () => {
    try {
        const usersExist = await model.Users.exists() //req.body.email нет потому что мы берем значения из параметров функции { email: email }
        const clientsExist = await model.Clients.exists()
        if (usersExist === null) {
            await model.Users.create(usersData)
            console.log('Users импортированы успешно')
        } else {
            console.log('Users уже есть в БД')
        }


        if (clientsExist === null) {
            await model.Clients.create(clientsData)
            console.log('Clients импортированы успешно')
        } else {
            console.log('Clients уже есть в БД')
        }


    } catch (err) {
        console.log('[ERROR]', err)
    }
}



export default connectionDB;