import * as actionTypes from '../actions/actions';
import {sortEvents} from '../../util'

const initialState = {
    events: {
        '2020-March-6': [
            {
                "id": 234234324324,
                "hour": "00:00",
                "description": "steef alenxander sheen caceres goes to jobsity example",
                "color": "#000000"
            },
            {
                "id": 54355345345,
                "hour": "01:00",
                "description": "Carolina salas revollo goes to university",
                "color": "#ffff00"
            }
        ]
    },
    loading: false,
    showSystemPopup: false,
    selectedDay: null,
    selectedEvents : null,
    monthsCounter : 0
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLOSE_DIALOG:
            return {
                ...state,
                showSystemPopup: false,
                selectedDay: null,
                selectedEvents : null
            }
        case actionTypes.OPEN_DAY_EVENTS:
            return {
                ...state,
                selectedDay: action.dateKey,
                selectedEvents: action.events,
                showSystemPopup: true
            }
        case actionTypes.ADD_CALENDAR_EVENT: {
            const newEvents = state.events || {};
            const eventsPerDay = newEvents[action.day] || [];
            newEvents[action.day] = eventsPerDay;
            eventsPerDay.push(action.event);
            sortEvents(eventsPerDay);
            return {
                ...state,
                event: newEvents,
                selectedEvents: eventsPerDay
            }
        }
        case actionTypes.UPDATE_CALENDAR_EVENT: {
            const newEvents = state.events || {};
            const eventsPerDay = newEvents[action.day] || [];
            const newEventsPerDay = eventsPerDay.filter(event => action.event.id !== event.id)
            newEventsPerDay.push(action.event);
            sortEvents(newEventsPerDay);
            newEvents[action.day] = newEventsPerDay;
            return {
                ...state,
                event: newEvents,
                selectedEvents: newEventsPerDay
            }
        }
        case actionTypes.REMOVE_CALENDAR_EVENT: {
            const newEvents = state.events || {};
            const eventsPerDay = newEvents[action.day] || [];
            const newEventsPerDay = eventsPerDay.filter(event => action.event.id !== event.id)
            newEvents[action.day] = newEventsPerDay
            return {
                ...state,
                event: newEvents,
                selectedEvents: newEventsPerDay
            }
        }
        case actionTypes.REMOVE_ALL_CALENDAR_EVENT: {
            const newEvents = state.events || {};
            newEvents[action.day] = [];
            return {
                ...state,
                event: newEvents,
                selectedEvents: newEvents[action.day]
            }
        }
        case actionTypes.CHANGE_MONTH: {
            return {
                ...state,
                monthsCounter: state.monthsCounter + action.value
            } 
        }
        // case actionTypes.CLOSE_SYSTEM_POPUP:
        //     return {
        //         ...state,
        //         showSystemPopup: false,
        //         systemPopUpMessage: '',
        //     }
        // case actionTypes.OPEN_SYSTEM_POPUP:
        //     return {
        //         ...state,
        //         showSystemPopup: true,
        //         systemPopUpMessage: action.message,
        //     }
        // case actionTypes.ASYNC_CALL_START:
        //     return {
        //         ...state,
        //         loading: true
        //     }
        // case actionTypes.ASYNC_CALL_END:
        //     return {
        //         ...state,
        //         loading: false,
        //     }
        // case actionTypes.ASYNC_CALL_FAILED:
        //     return {
        //         ...state,
        //         loading: false,
        //         error: action.error
        //     }
        // case actionTypes.ADD_BET_LOCALLY:
        //     const oldMatch = state.matches[action.matchId];
        //     const newMatch = {
        //         ...oldMatch,
        //         result: action.result
        //     }
        //     const newMatches = [...state.matches];
        //     newMatches[action.matchId] = newMatch;
        //     return {
        //         ...state,
        //         matches: [...newMatches]
        //     }
        // case actionTypes.TOGGLE_LEFT_BAR:
        //     return {
        //         ...state,
        //         showLeftBar: !state.showLeftBar
        //     }
        // case actionTypes.HIDE_LEFT_BAR:
        //     return {
        //         ...state,
        //         showLeftBar: false,
        //     }
        // case actionTypes.USER_LOGOUT:
        //     return {
        //         ...state,
        //         ...initialState
        //     }
        // case actionTypes.SET_SCROLL_CONTENT_VARIABLE:
        //     return {
        //         ...state,
        //         scrollContentValue: action.value
        //     }
        // case actionTypes.FETCH_APP_INFO_SUCCEED:
        //     return {
        //         ...state,
        //         info: action.info,
        //         loading: false,
        //     }
        // case actionTypes.FETCH_RESULTS_SUCCEED:
        //     return {
        //         ...state,
        //         results: action.results,
        //         loading: false,
        //     }

        // case actionTypes.FETCH_BETS_BY_MATCH_SUCCEED:
        //     return {
        //         ...state,
        //         results: action.results,
        //         loading: false,
        //         selectedMatch: action.selectedMatch,
        //         betsByMatch: action.betsByMatch
        //     }
        // case actionTypes.UPDATE_USER_UPDATE:
        //     return {
        //         ...state,
        //         loading: false,
        //         showSystemPopup: true,
        //         systemPopUpMessage: 'Datos actualizados correctamente. Se le envio un correo con los nuevos datos'
        //     }
        // case actionTypes.SET_BACK_FROM_MATCH_VARIABLE:
        //     return {
        //         ...state,
        //         backFromMatchPage: action.value
        //     }
        default:
            return state;
    }
};


export default reducer;