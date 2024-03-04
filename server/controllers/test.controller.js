export const test = (req, res, next) => {
    res.status(200).json({result: true, message: 'Success..'});
}