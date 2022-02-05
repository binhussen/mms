import {AppState} from "../models/app.state";
import {createSelector} from "@ngrx/store";

const getGlobalState = (appState: AppState) => appState.global;

const getLoadingState = createSelector(getGlobalState, (global) => global.loading);

const getErrorState = createSelector(getGlobalState, (global) => global.error);

const getMessageState = createSelector(getGlobalState, (global) => global.message);


export default {getErrorState, getLoadingState, getMessageState};
