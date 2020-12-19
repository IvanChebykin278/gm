import * as types from './types';

export const setPoints = (points) => dispatch => {
    dispatch({
        type: types.SET_POINTS,
        payload: points
    });
}

export const setRegion = (path, value) => dispatch => {
    dispatch({
        type: types.SET_REGION,
        payload: { path, value }
    });
}

export const changeState = (path, value) => dispatch => {
    dispatch({
        type: types.CHANGE_STATE,
        payload: { path, value }
    });
}

export const isPreprocess = (method) => dispatch => {
    dispatch({
        type: types.IS_PREPROCESS,
        payload: method
    })
}

export const createFinalChart = () => dispatch => {
    dispatch({
        type: types.CREATE_FINAL_CHART
    })
}