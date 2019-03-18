'use strict';

module.exports = {};
const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app = express();

app.get('/scrape', (req, res) => {
    url = 'https://stadsschouwburgamsterdam.nl/voorstellingen/12098-the-hole';

    let title, time, place;
    let json = {title: "", time: "", place: ""};

    request(url, (err, res, html) => {
        if(!err) {
            let $ = cheerio.load(html);
            json.title = $('.title').children().first().text();

            console.log(json);

            $('.time').filter(() => {
                let data = $(this);
                time = data.text();
                json.time = time;
            });

            $('.place').filter(() => {
                let data = $(this);
                place = data.text();
                json.place = place;
            });
        }
    });

    fs.writeFile('stadsschouwburg.json', JSON.stringify(json, null, 4), () => {
        console.log(json);
    });

    res.send('Check console!');
});

app.listen('8080');