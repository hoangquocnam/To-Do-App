const { handleError } = require('../helper')


function parseRequestBody(request, response) {
    try {
        return new Promise((resolve, reject) => {
            let chunks = [];
            request
                .on('data', (chunk) => {
                    chunks.push(chunk);
                })
                .on('end', () => {
                    let dataBody = {};
                    if (chunks.length > 0) {
                        dataBody = JSON.parse(chunks);
                    }
                    request.body = dataBody;
                    resolve();
                })
                .on('error', (error) => {
                    handleError(error, './middlewares/parseRequestBody.js', 'parseRequestBody');
                    reject(error);
                })
        })
    }
    catch (error) {
        if (error) {
            handleError(error, './middlewares/parseRequestBody.js', 'parseRequestBody')
        }
        const message = error.message || 'Invalid request!'
        response.statusCode = 401;
        response.end(message);
    }
}


module.exports = parseRequestBody