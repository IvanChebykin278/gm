import * as types from '../actions/types';
import preprocessing from '../utils/secondMethod/preprocessing';
import findPoints from '../utils/secondMethod/find';
import createPoints from '../utils/createPoints';
import createRegion from '../utils/createRegion';

// const points = createPoints(10000);
// const prepr = preprocessing(points);

const initialState = {
    preprocess: null,
    currentResult: null,
    currentTime: null,
    // resultMap: [...Array(100).keys()].map(i => {
    //     const region = createRegion()
    //     const { finded, time } = findPoints(prepr, region, points);

    //     return {
    //         countPoints: points.length,
    //         time,
    //         result: finded
    //     }
    // }),
    resultMap: []
};

export default function(state = initialState, action) {

    switch(action.type) {

        case types.PREPROCESSING: {

            if(action.payload.method !== 'second') {
                return state;
            }

            const preprocess = preprocessing(action.payload.points);

            return {
                ...state,
                preprocess
            };
        }

        case types.FIND: {

            if(action.payload.method !== 'second') {
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