import * as actionTypes from './actions';

export const asyncCallStart = () => {
    return {
        type: actionTypes.ASYNC_CALL_START
    };
};

export const asyncCallEnd = () => {
    return {
        type: actionTypes.ASYNC_CALL_END
    };
};

export const openDialog = () => {
    return {
        type: actionTypes.OPEN_DIALOG
    };
}

export const closeDialog = () => {
    return {
        type: actionTypes.CLOSE_DIALOG
    };
}