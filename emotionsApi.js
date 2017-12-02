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

    getData (faceUrl, cb) {
        const apiUrl = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';

        const data = {
            url: faceUrl
        };

        const options = {
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': '0d684e24b19b4a76bb60b92c22c43fc8'
            }
        };

        needle.request(
            'POST', apiUrl, data, options,
            function (err, response) {
                var scores = response.body[0].scores;
                cb({
                    'sadness': scores.sadness,
                    'happiness': scores.happiness
                })
            }
        );

    };
}

module.exports = EmotionsApi;