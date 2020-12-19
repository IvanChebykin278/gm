import * as types from '../actions/types';
import preprocessing from '../utils/thirdMethod/preprocessing';
import findPoints from '../utils/thirdMethod/find';

const initialState = {
    preprocess: null,
    currentResult: null,
    currentTime: null,
    resultMap: [],
};

export default function(state = initialState, action) {

    switch(action.type) {

        case types.PREPROCESSING: {

            if(action.payload.method !== 'third') {
                return state;
            }

            const preprocess = preprocessing(action.payload.points);

            return {
                ...state,
                preprocess
            };
        }

        case types.FIND: {

            if(action.payload.method !== 'third') {
                return state;
            }

            const { points, region } = action.payload.general;
            const { finded, time } = findPoints(state.preprocess, region, points);

            return {
                ...state,
                currentResult: finded,
                currentTime: time,
                resultMap: [
                    ...state.resultMap,
                    {
                        countPoints: points.length,
                        result: finded,
                        time
                    }
                ],
            }
        }

        default:
            return state;
    }
}