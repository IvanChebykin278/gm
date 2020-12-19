import { combineReducers } from 'redux';
import generalReducer from './generalReducer';
import firstMethodReducer from './firstMethodReducer';
import secondMethodReducer from './secondMethodReducer';
import thirdMethodReducer from './thirdMethodReducer';

export default combineReducers({
    general: generalReducer,
    firstMethod: firstMethodReducer,
    secondMethod: secondMethodReducer,
    thirdMethod: thirdMethodReducer
});