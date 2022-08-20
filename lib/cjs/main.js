"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.query = exports.setAPIKey = exports.getAPIKey = void 0;
const request_1 = __importDefault(require("request"));
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
exports.getAPIKey = api.giphy.getAPIKey;
exports.setAPIKey = api.giphy.setAPIKey;
const query = (input) => {
    const searchApi = api.giphy.search;
    return new Promise((resolve, reject) => {
        (0, request_1.default)(searchApi.url(input), (err, response, body) => {
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
exports.query = query;
const random = (input) => {
    const randomApi = api.giphy.random;
    return new Promise((resolve, reject) => {
        (0, request_1.default)(randomApi.url(input), (err, response, body) => {
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
exports.random = random;
