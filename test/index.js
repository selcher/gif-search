import 'dotenv/config';
const API_KEY = process.env.GIPHY_API_KEY;

import * as gifSearch from './../lib/esm/main.js';
import test from 'ava';

const isValidGifUrl = (url) => (
    url.match(/\/.*?.gif/g) ? true : false
);

test('Set API Key', async t => {
    const oldAPIKey = gifSearch.getAPIKey();
    const newAPIKey = 'test';

    gifSearch.setAPIKey(newAPIKey);
    console.log(gifSearch.getAPIKey(), ' = ', newAPIKey);

    t.true(gifSearch.getAPIKey() === newAPIKey);

    gifSearch.setAPIKey(oldAPIKey);
});

test('Gif search', async t => {
    try {
        gifSearch.setAPIKey(API_KEY);

        const response = gifSearch.query('cat');
        const gifUrl = await response;

        t.true(isValidGifUrl(gifUrl));
    }
    catch(e) {
        t.true(false, e);
    }
});

test('Random gif search', async t => {
    try {
        gifSearch.setAPIKey(API_KEY);

        const response1 = gifSearch.random('cat');
        const response2 = gifSearch.random('cat');
        const gifUrl1 = await response1;
        const gifUrl2 = await response2;

        t.true(isValidGifUrl(gifUrl1));
        t.true(isValidGifUrl(gifUrl2));
        t.true(gifUrl1 !== gifUrl2);
    }
    catch(e) {
        t.true(false, e);
    }
});


