import { combineReducers } from 'redux';
import articleReducer  from './articleReducer';
import errorReducer  from './errorReducer';
import messageReducer  from './messageReducer';
import authReducer  from './authReducer';
import categoryReducer  from './categoryReducer';

export default combineReducers({
    article: articleReducer,
    error: errorReducer,
    message: messageReducer,
    auth: authReducer,
    category: categoryReducer
});
