
// альтернатива
/** app.use(function (req, res, next) {
*     next(createError(404));
* });
*/


// app.get('/*', (req, res) => {
//     res.status(404).json('Not Found')
// });

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statucCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not Found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}

export { notFound, errorHandler }


// const middlewareTest = (req, res, next) => {
//   console.log('request:')
//   next()
// }
//app.use(middlewareTest)




// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     //render the error page

//     app.use(function (err, req, res, next) {
//         console.error(err.message);
//         if (!err.statusCode) err.statusCode = 500;
//         res.status(err.statusCode).send(err.message);
//     });

//     res.status(err.status || 500);
//     res.json({
//         message: err.message,
//         error: err
//     });
// });


// // for development mode
// if (process.env.NODE_ENV === 'production') {
//     app.get('*', function (req, res) {

//         res.sendFile(path.resolve('../client', 'build', 'index.html')); //or path.join
//     });
// } else {
//     app.get('/', (req, res, next) => {
//         res.send('API running ✌').json({
//             message: 'hello'
//         });
//     });
// }