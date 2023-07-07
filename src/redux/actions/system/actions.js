import { SET_SYSTEM_DATA } from './actionTypes';

export const setSystemData = (content) => ({
    type: SET_SYSTEM_DATA,
    payload: {
        content,
    },
});
