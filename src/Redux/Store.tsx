import {createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './Reducer'
import { composeWithDevTools } from "redux-devtools-extension";

const store  =createStore(reducer, composeWithDevTools())

export default store