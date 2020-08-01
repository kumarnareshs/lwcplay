import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// import logger from './middlewares/logger';
// import localStorage, { loadState } from './middlewares/localstorage';

import application from './modules/application/reducers';
// import categories from './modules/categories/reducers';
// import episodes from './modules/episodes/reducers';
// import info from './modules/info/reducers';
// import player from './modules/player/reducers';
// import shows from './modules/shows/reducers';
//import users from './modules/users/reducers';

 let middlewares = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//     middlewares = [...middlewares, logger];
// }

export const store = createStore(
    combineReducers({
       application
    }),
    //loadState(),
    applyMiddleware(...middlewares)
);
