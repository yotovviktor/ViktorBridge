import { createStore } from 'easy-peasy'
import initialState from './models';

const store = createStore(initialState);

export default store;