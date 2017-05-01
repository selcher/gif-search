import gifSearch from './../dist/gif-search.min';
import test from 'ava';

test('Gif search', async t => {
    const response = gifSearch.gif('cat');
    const gifUrl = await response;

    t.true(gifUrl.endsWith('.gif'));
});

test('Random gif search', async t => {
    const response = gifSearch.gif('cat');
    const gifUrl = await response;

    t.true(gifUrl.endsWith('.gif'));
});