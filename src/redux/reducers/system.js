import { SET_SYSTEM_DATA } from '../actions/system/actionTypes';

const initialState = {
    isLogin: false,
    hasInternet: true,
    pokemons: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SYSTEM_DATA: {
            const { content } = action.payload;
            return {
                ...state,
                [content.key]: content.value,
            };
        }
        default:
            return state;
    }
}
