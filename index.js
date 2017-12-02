const express = require('express')
const app = express()
const emotionsApi = require('./emotionsApi').create();

emotionsApi.getData('http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg', function (data) {
    console.log('data retrieved');
    console.log(data);
});
