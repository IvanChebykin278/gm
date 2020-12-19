import * as types from './types';

export const fFindPoints = (general) => dispatch => {
    dispatch({
        type: types.FIND,
        payload: {
            method: 'first',
            general
        }
    });
}