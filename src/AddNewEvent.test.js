import * as actions from './store/actions/index';
import * as actionTypes from './store/actions/actions';

describe('actions', () => {
    it('Should create a new event for the given day', () => {
        const day = "2020-March-6";
        const event = {
            hour: "00:00",
            description: "test Reducer"
        };
        const expectedAction = {
            type: actionTypes.ADD_CALENDAR_EVENT,
            day: day,
            event: event
        }
        expect(actions.addCalendarEvent(day,event)).toEqual(expectedAction)
    })
})