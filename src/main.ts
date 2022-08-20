import Request from 'request';

/**
 * Helper Functions
 */

const replaceSpaceWithPlus = (str: string): string => (
  str.split(' ').join('+')
);

/**
 * Gif Search API
 */

namespace GIPHY_API {
  export type API_KEY = string;

  export type SEARCH_PARAM = string;
  export type SEARCH_RESULT = {
      data: {
          images: {
              fixed_height: {
                  url: string
              }
          }
      }[]
  };

  export type RANDOM_PARAM = string;
  export type RANDOM_RESULT = {
      data: {
          images: {
              fixed_height: {
                  url: string
              }
          }
      }
  };
}

const api = {
  giphy: {
      apiKey: '',
      getAPIKey: () => (api.giphy.apiKey),
      setAPIKey: (apiKey: GIPHY_API.API_KEY) => {
          api.giphy.apiKey = apiKey;
      },
      search: {
          url: (keywords: GIPHY_API.SEARCH_PARAM) => {
              return [
                  'http://api.giphy.com/v1/gifs/search?',
                  `q=${replaceSpaceWithPlus(keywords)}`,
                  `&api_key=${api.giphy.getAPIKey()}&limit=1`,
                  '&offset=0'
              ].join('');
          },
          imageUrl: (data: GIPHY_API.SEARCH_RESULT) => (
              data.data[0].images['fixed_height'].url
          )
      },
      random: {
          url: (keywords: GIPHY_API.RANDOM_PARAM) => {
              return [
                  'http://api.giphy.com/v1/gifs/random?',
                  `tag=${replaceSpaceWithPlus(keywords)}`,
                  `&api_key=${api.giphy.getAPIKey()}&limit=1`,
                  '&offset=0'
              ].join('');
          },
          imageUrl: (data: GIPHY_API.RANDOM_RESULT) => (
              data.data.image_url
          )
      }
  }
};

/**
 * Module API
 */

export const getAPIKey = api.giphy.getAPIKey;
export const setAPIKey = api.giphy.setAPIKey;
export const query = (input: string) =>
{
  const searchApi = api.giphy.search;

  return new Promise((resolve, reject) => {
      Request(
          searchApi.url(input),
          (err: Error, response: any, body: string) => {
              if (err) {
                  reject(err);
              } else if (response.statusCode === 200) {
                  resolve(
                      searchApi.imageUrl(
                          JSON.parse(body)
                      )
                  );
              } else {
                  reject(err);
              }
          }
      );
  });
};

export const random = (input: string) =>
{
  const randomApi = api.giphy.random;

  return new Promise((resolve, reject) => {
      Request(
          randomApi.url(input),
          (err: Error, response: any, body: string) => {
              if (err) {
                  reject(err);
              } else if (response.statusCode === 200) {
                  resolve(
                      randomApi.imageUrl(
                          JSON.parse(body)
                      )
                  );
              } else {
                  reject(err);
              }
          }
      );
  });
};
