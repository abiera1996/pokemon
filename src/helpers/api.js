import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const YOUTUBE_BASE_URL = 'https://pokeapi.co/api/v2';

export default class API {
    apiConfig = {};
    hasResponse = false;

    constructor(apiConfig) {
        this.apiConfig = apiConfig;
        this.cancelTokenSource = axios.CancelToken.source();
    }

    requestAPI() {
        const self = this;
        return new Promise((resolve, reject) => {
            self.checkInternetConnection()
                .then(async (response) => {
                    if (response) {
                        try {
                            setTimeout(() => {
                                if (!self.hasResponse) self.cancelRequest();
                            }, 10000);

                            const response = await axios.request({
                                ...self.apiConfig,
                                cancelToken: self.cancelTokenSource.token,
                            });
                            self.hasResponse = true;
                            resolve(response.data);
                        } catch (error) {
                            if (axios.isCancel(error)) {
                                console.log('Request canceled:', error.message);
                            } else {
                                console.log(
                                    'Request failed:',
                                    error.message,
                                    `(${JSON.stringify(self.apiConfig)})`,
                                );
                            }
                            self.hasResponse = true;
                            reject(error);
                        }
                    }
                })
                .catch((err) => {
                    console.log('Request failed Network:', err);
                    reject(err);
                });
        });
    }

    cancelRequest() {
        console.log('cancel request');
        this.cancelTokenSource.cancel('Request canceled by user.');
    }

    setupAxios() {
        axios.defaults.headers.common['X-RapidAPI-Key'] = '';
        axios.defaults.headers.common['X-RapidAPI-Host'] = '';
    }

    checkInternetConnection() {
        return new Promise((resolve, reject) => {
            NetInfo.fetch().then((state) => {
                if (state.isConnected == true) {
                    // save on state management
                    resolve(true);
                } else if (state.isConnected == false) {
                    // save on state management
                    reject('Internet connection failure.');
                }
            });
        });
    }
}

export const getPokemons = (payload) => {
    /**
     * params { 
        * offset: 1
        * limit: 5
        }
     */
    const apiRequest = new API({
        url: `${YOUTUBE_BASE_URL}/pokemon/`,
        method: 'GET',
        params: payload,
    });
    return apiRequest;
};

export const getPokemonDetails = (name, payload) => {
    /**
     * params { 
        }
     */
    const apiRequest = new API({
        url: `${YOUTUBE_BASE_URL}/pokemon/${name}`,
        method: 'GET',
        params: payload,
    });
    return apiRequest;
};
