import * as types from '../actions/types';
import findPoints from '../utils/firstMethod/find';
import createRegion from '../utils/createRegion';
import createPoints from '../utils/createPoints';

const initialState = {
    currentResult: null,
    currentTime: null,
    // resultMap: [...Array(100).keys()].map(i => {

    //     const points = createPoints((i + 1) * 100);
    //     const region = createRegion();
    //     const { finded, time } = findPoints(points, region);

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

        case types.FIND: {
            if(action.payload.method !== 'first') {
                return state;
            }

            const { points, region } = action.payload.general;
            const { finded, time } = findPoints(points, region);

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
                ]
            }
        }

        default:
            return state;
    }
}