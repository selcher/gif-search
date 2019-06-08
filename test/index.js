import gifSearch from './../dist/gif-search.min';
import test from 'ava';

const isValidGifUrl = (url) => (
    url.match(/\/.*?.gif/g) ? true : false
);

test('Set API Key', async t => {
    const defaultAPIKey = gifSearch.getAPIKey();
    const newAPIKey = 'test';

    gifSearch.setAPIKey(newAPIKey);

    t.true(gifSearch.getAPIKey() !== defaultAPIKey);

    gifSearch.setAPIKey(defaultAPIKey);
});

test('Gif search', async t => {
    try {
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
