import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import session from 'express-session';
import dotenv from 'dotenv'; 
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import colors from 'colors';
import simpleLog from './middlewares/simpleLogger.middleware.js';
import connectionDB from './config/db.config.js';
import morganMiddleware from './middlewares/morganLogger.middleware.js';
import fs from 'fs';
import http from 'http';
import https from 'https';
import pdf from 'html-pdf';
import { spawn, exec } from 'child_process';
import { notFound, errorHandler } from './middlewares/error.middleware.js';
import { commisionOrder } from './documents/commission-order.js';
import rateLimit  from 'express-rate-limit';
import mainRoute from './routes/index.js'


dotenv.config(); //alternative ({ path: path.join(__dirname, '.env') });
colors.enable();

const __dirname = path.resolve();
// mongoose setup
const PORT = process.env.PORT || 5088;


const sessionConfig = session({
    secret: process.env.CSRFT_SESSION_SECRET,
    keys: ['00741eda-e72a-4e22-be7c-94732f1b1fba'],
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: parseInt(process.env.CSRFT_EXPIRESIN), // Used for expiration time.
        sameSite: 'strict', // Cookies will only be sent in a first-party context. 'lax' is default value for third-parties.
        httpOnly: true, //Ensures the cookie is sent only over HTTP(S)
        // domain: process.env.DOMAIN, //Used to compare against the domain of the server in which the URL is being requested.
        secure: false // Ensures the browser only sends the cookie over HTTPS. false for localhost.
    }
});



const corsConfig = cors({
    origin: process.env.CLIENT_URL,
    credentials: true
})

// Определите лимит запросов (например, 10 запросов в минуту)
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 минута
    max: 10, // максимальное количество запросов
    message: 'Слишком много запросов с вашего IP, попробуйте позже.',
  });


/* CONFIGURARION */
const app = express();
connectionDB(); // connection db
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/json
app.use(express.json({ limit: "100mb" })); // parse json bodies limit 100
app.use(corsConfig);
app.use(cookieParser(process.env.COOKIE_PARSE));
app.use(compression()) // compress all responses
app.use(helmet()); // set secure HTTP headers
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morganMiddleware);
app.use(sessionConfig);
app.disable('x-powered-by'); // remove X-Powered-By for secure
app.use(simpleLog); // log the requested resource

// ! NOT FOR PROD
app.set('trust proxy', 1);

/* API routes */
app.use('/api/v1', mainRoute);


app.post('/workflow/categorization-commission', (req, res) => {
       const pdfOptions = {
        childProcessOptions: {
            env: {
                OPENSSL_CONF: '/dev/null',
            },
        },
    };
    pdf.create(commisionOrder(req.body), pdfOptions).toFile('commissionOrder.pdf', (err) => {
        if (err) {
            // Handle the error appropriately, log it or send an error response
            console.error('Error creating PDF:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // Only send a success response here if needed
        res.json({ success: true });
    });
});

// Примените лимитер к вашему эндпоинту
app.get('/workflow/categorization-commission', limiter, (req, res) => {
    const filePath = path.join(__dirname, 'commissionOrder.pdf');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending PDF file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
  });
  


// TODO: переписать в роутер отдельный
// app.use('/', documentsRouter)

// @ Static
app.use(express.static(path.join(__dirname, '../client/build')));
// (__dirname, '../client', 'build', 'index.html'));


// const bat = spawn('cmd.exe', ['/c', 'my.bat']);
// bat.stdout.on('data', (data) => {
//     console.log(data.toString());
//   });
  
//   bat.stderr.on('data', (data) => {
//     console.error(data.toString());
//   });
  
//   bat.on('exit', (code) => {
//     console.log(`Child exited with code ${code}`);
//   }); 



// Функция для создания текстового файла
function createTextFile(path) {
    fs.writeFile(path, '', function (err) {
        if (err) throw err;
        console.log('File Created!')
    });
}

createTextFile(__dirname+'/file.txt');

//Wacher_Function
// async function watchChanges(database, collection) {
//     const db = client.db(database);
//     const collectionToWatch = db.collection(collection);

//     try {
//       const changeStream = collectionToWatch.watch();
//       changeStream.on('change', (change) => {
//         console.log('Change:', change);
//       });
//       console.log('Watching for changes...');
//     } catch (error) {
//       console.error('Error watching changes:', error);
//     }
//   }

//   watchChanges('auth', WatcherConfig);

// Функция для наблюдения и запуска контейнера при изменении 'file.txt'
// function watchFile(path) {
//     fs.watch(path, {persistent: true}, (curr, prev) => {
//         fs.readFile(path, 'utf8', function(err, data) {
//             console.log('(2)')
//             if (err) throw err;
//             if(data == "start = 0") {
//                 // spawn('docker', ['-d', 'run', 'mydockerimage']);
//                 console.log('(3)')
//             }
//         });
//     });
// };
// watchFile('C:/temp/file.txt');


app.post('/sast/language/test', (req, res) => {
    // await bat.stdout.on('data', (data) => {
    //     console.log(data.toString());
    //   });
     // Создаем файл с именем 'file.txt' в директории C:/temp 
    // spawn('cmd.exe', ['/s', '/c', 'echo', '11', '>', 'C:/temp/file.txt']);
    // Или используйте функцию выше
    // createTextFile('C:/temp/file.txt');
    // Создаем файл с именем 'file.txt' в директории C:/temp
spawn('cmd.exe', ['echo', "start = 0", '>', __dirname+'/file.txt']);
// Или используйте функцию выше
// createTextFile('C:/temp/file.txt');
// Вызываем функцию для наблюдения изменений в 'file.txt'

});






/* Static content */
// app.use(express.static(path.join(__dirname + '/public')));

if (process.env.NODE_ENV === 'production') {
    app.use(function (req, res, next) {
        res.setHeader(
            'Content-Security-Policy-Report-Only',
            "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
        );
        next()
    });
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}


/* custom middleware */
app.use(errorHandler); // error middleware
app.use(notFound); // not found page middleware



/**
 * RUN SERVER 
 * async mode (non-blocking) 
*/

const startServer = async () => {
    try {
        // Создание HTTP-сервера
        const httpServer = http.createServer(app);

        // Загрузка SSL-сертификата и ключа
        const privateKey = fs.readFileSync('../key.pem', 'utf8');
        const certificate = fs.readFileSync('../cert.pem', 'utf8');
        const credentials = { key: privateKey, cert: certificate };

        // Создание HTTPS-сервера с использованием Express
        const httpsServer = https.createServer(credentials, app);

        // Слушаем порты для обоих серверов
        await Promise.all([
            httpServer.listen(PORT, () => {
                console.log(`[Backend] HTTP Server start success in ${process.env.NODE_ENV} mode on ${process.env.DOMAIN}:${PORT}🦉`.green.bold);
            }),
            httpsServer.listen(8443, () => {
                console.log(`[Backend] HTTPS Server start success in ${process.env.NODE_ENV} mode on ${process.env.DOMAIN}:8443🦉`.green.bold);
            })
        ]);
    } catch (err) {
        throw new Error(err);
    }
}

startServer();