import * as types from './types';

export const tpreprocessing = (points) => dispatch => {
    dispatch({
        type: types.PREPROCESSING,
        payload: {
            method: 'third',
            points
        }
    });
    dispatch({
        type: types.IS_PREPROCESS,
        payload: 'third'
    });
};

export const tFindPoints = (general) => dispatch => {
    dispatch({
        type: types.FIND,
        payload: {
            method: 'third',
            general
        }
    });
};