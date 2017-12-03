// Emotions API
// input: image
// output: confidence across a set of emotions for each face in the image, as well as bounding box for the face
// Subscription keys:
//     1. 0d684e24b19b4a76bb60b92c22c43fc8
//     2. cf0cb20a32c04e55a1a88e6008f04271

const needle = require('needle');

class EmotionsApi {

    constructor() {

    };

    static create() {
        return new EmotionsApi();
    };

    getData(blob, cb) {
        const apiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';
        console.log("BLOB IS " + blob);

        const options = {
            json: true,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key': '0d684e24b19b4a76bb60b92c22c43fc8'
            }
        };

        needle.request(
            'POST', apiUrl, blob, options,
            function (err, response) {
                if (response.statusCode == 200) {
                    console.log("200 " + response);
                    var scores = response.body[0].scores;
                    cb({
                        'sadness': scores.sadness,
                        'happiness': scores.happiness
                    })
                } else {
                    console.log("err");
                    console.log(err);
                    var errMsg;
                    if (err) {
                        errMsg = err.message;
                        console.log(errMsg);
                    } else {
                        errMsg = 'Cannot retrieve data for url';
                    }

                    cb({
                        'error': errMsg
                    });
                }
            }
        );

    };


}

module.exports = EmotionsApi;