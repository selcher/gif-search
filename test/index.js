import gifSearch from './../dist/gif-search.min';
import test from 'ava';

test('Gif search', async t => {
    const response = gifSearch.query('cat');
    const gifUrl = await response;

    t.true(gifUrl.endsWith('.gif'));
});

test('Random gif search', async t => {
    const response1 = gifSearch.random('cat');
    const response2 = gifSearch.random('cat');
    const gifUrl1 = await response1;
    const gifUrl2 = await response2;

    t.true(gifUrl1.endsWith('.gif'));
    t.true(gifUrl2.endsWith('.gif'));
    t.true(gifUrl1 !== gifUrl2);
});