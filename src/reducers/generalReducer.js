import * as types from '../actions/types';
import createFinalChart from '../utils/finalChart';

const initialState = {
    points: [],
    countPoints: 4,
    method: 1,
    region: {
        start: { x: 300, y: 100 },
        end: { x: 500, y: 300 }
    },
    isPreprocesses: {
        second: false,
        third: false
    },
    finalChart: null
};

export default function(state = initialState, action) {
    switch(action.type) {

        case types.CHANGE_STATE: {
            debugger;
            const { path, value } = action.payload;
            const newState = { ...state };
            const aPath = path.split('/');
            let link = newState;

            aPath.forEach((item, index) => {
                if(index === aPath.length - 1) {
                    link[item] = value;
                } else {
                    link = link[item];
                }
            });

            return newState;
        }

        case types.SET_POINTS: {
            return {
                ...state,
                points: action.payload,
                isPreprocesses: {
                    second: false,
                    third: false,
                }
            }
        }

        case types.SET_REGION: {
            const { path, value } = action.payload;
            const props = path.split('/');

            return {
                ...state,
                region: {
                    ...state.region,
                    [props[0]]: {
                        ...state.region[props[0]],
                        [props[1]]: value
                    }
                }
            };
        }

        case types.IS_PREPROCESS: {
            return {
                ...state,
                isPreprocesses: {
                    ...state.isPreprocesses,
                    [action.payload]: !state.isPreprocesses[action.payload]
                }
            }
        }

        case types.CREATE_FINAL_CHART: {
            return {
                ...state,
                finalChart: createFinalChart()
            }
        }

        default:
            return state;
    }
}