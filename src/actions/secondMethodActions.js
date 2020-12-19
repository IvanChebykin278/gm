import * as types from './types';

export const spreprocessing = (points) => dispatch => {
    dispatch({
        type: types.PREPROCESSING,
        payload: {
            method: 'second',
            points
        }
    });
    dispatch({
        type: types.IS_PREPROCESS,
        payload: 'second'
    });
};

export const sFindPoints = (general) => dispatch => {
    dispatch({
        type: types.FIND,
        payload: {
            method: 'second',
            general
        }
    });
};