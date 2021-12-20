import {
    takeLatest,
    all,
    put,
    fork,
    call
}               from 'redux-saga/effects';
import * as types from './actionTypes';
import { getRecipes } from './api';

export function* onLoadRecipeAsync ({ query}) {
    try {
        console.log ('query', query);

        const response = yield call (getRecipes, query); //call is used to make api call...
        yield put ({ type: types.FETCH_RECIPE_SUCCESS, payload: response.data });  //put is used to dispatch an action

    } catch (error) {
        yield put ({ type: types.FETCH_RECIPE_FAIL, payload: error });

    }
}

export function* onLoadRecipe () {
    yield takeLatest (types.FETCH_RECIPE_START, onLoadRecipeAsync);
}


const recipeSaga = [fork(onLoadRecipe)];

export default function* rootSaga () {
    yield all ([...recipeSaga]);
}