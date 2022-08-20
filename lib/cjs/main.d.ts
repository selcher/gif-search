/**
 * Gif Search API
 */
declare namespace GIPHY_API {
    type API_KEY = string;
    type SEARCH_PARAM = string;
    type SEARCH_RESULT = {
        data: {
            images: {
                fixed_height: {
                    url: string;
                };
            };
        }[];
    };
    type RANDOM_PARAM = string;
    type RANDOM_RESULT = {
        data: {
            images: {
                fixed_height: {
                    url: string;
                };
            };
        };
    };
}
/**
 * Module API
 */
export declare const getAPIKey: () => string;
export declare const setAPIKey: (apiKey: GIPHY_API.API_KEY) => void;
export declare const query: (input: string) => Promise<unknown>;
export declare const random: (input: string) => Promise<unknown>;
export {};
