const formatHelper = require('../helper/formatter')

module.exports = (err, req, res, next) => {
    console.log(err)
    switch (err.name) {
        case 'SequelizeValidationError':
            res.status(400).json(formatHelper.validationErrorFormat(err.errors))
            break;

        case 'SequelizeDatabaseError':
            res.status(500).json({ error: 'Internal Server Error' })
            break;

        case 'Authorization':
            res.status(401).json(err.message)
            break;

        case 'Authentication':
            res.status(403).json(err.message)
            break;

        case 'Nodata':
            res.status(404).json(err.message)
            break;

        default:
            res.status(500).json({ error: 'Server Error' })
            break;
    }
}
