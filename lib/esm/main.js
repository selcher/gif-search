import Request from 'request';
/**
 * Helper Functions
 */
const replaceSpaceWithPlus = (str) => (str.split(' ').join('+'));
const api = {
    giphy: {
        apiKey: '',
        getAPIKey: () => (api.giphy.apiKey),
        setAPIKey: (apiKey) => {
            api.giphy.apiKey = apiKey;
        },
        search: {
            url: (keywords) => {
                return [
                    'http://api.giphy.com/v1/gifs/search?',
                    `q=${replaceSpaceWithPlus(keywords)}`,
                    `&api_key=${api.giphy.getAPIKey()}&limit=1`,
                    '&offset=0'
                ].join('');
            },
            imageUrl: (data) => (data.data[0].images['fixed_height'].url)
        },
        random: {
            url: (keywords) => {
                return [
                    'http://api.giphy.com/v1/gifs/random?',
                    `tag=${replaceSpaceWithPlus(keywords)}`,
                    `&api_key=${api.giphy.getAPIKey()}&limit=1`,
                    '&offset=0'
                ].join('');
            },
            imageUrl: (data) => (data.data.images['fixed_height'].url)
        }
    }
};
/**
 * Module API
 */
export const getAPIKey = api.giphy.getAPIKey;
export const setAPIKey = api.giphy.setAPIKey;
export const query = (input) => {
    if (!getAPIKey()) {
        return Promise.reject('Missing API Key');
    }
    const searchApi = api.giphy.search;
    return new Promise((resolve, reject) => {
        Request(searchApi.url(input), (err, response, body) => {
            if (err) {
                reject(err);
            }
            else if (response.statusCode === 200) {
                resolve(searchApi.imageUrl(JSON.parse(body)));
            }
            else {
                reject(err);
            }
        });
    });
};
export const random = (input) => {
    const randomApi = api.giphy.random;
    if (!getAPIKey()) {
        return Promise.reject('Missing API Key');
    }
    return new Promise((resolve, reject) => {
        Request(randomApi.url(input), (err, response, body) => {
            if (err) {
                reject(err);
            }
            else if (response.statusCode === 200) {
                resolve(randomApi.imageUrl(JSON.parse(body)));
            }
            else {
                reject(err);
            }
        });
    });
};
