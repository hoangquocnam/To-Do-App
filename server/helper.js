const { logger } = require('./utils/logger')

exports.handleError = function handleError(
    error,
    filePath = '',
    functionName = ''
) {
    logger.error(`${filePath} -> ${functionName} -> Error: ${error}`)
}