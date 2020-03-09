import React, { Component } from 'react';
import Classes from './EventList.module.css';
import Modal from '../../components/Modal/Modal';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux';
import { getWeather } from '../../util'
import {FaTrash, FaRegCalendarPlus, FaCheck, FaTimes, FaTimesCircle} from 'react-icons/fa';
import TimePicker from 'react-time-picker';
import EventListElement from '../../components/EventListElement/EventListElement'

import Button from '@material-ui/core/Button';
const initialState = {
    edit: false,
    selectedTime: "",
    selectedCity: "",
    weather: null,
    color: "#FFFF",
    showAddEdit : false,
    error: "", 
    description: "",
    id: "",
    inputsValidation: {
        timeTouched: false,
        timeError: true,
        descriptionTouched: false,
        descriptionError: true,
        cityTouched: false,
        cityError: true,
        colorTouched: false,
        colorError: false
    }
}


class EventList extends Component {
    state = {
        ...initialState
    }

    toggleAddEdit = () => {
        this.setState({
            showAddEdit: !this.state.showAddEdit,
            id: ""
        });
    }

    resetAndCloseDialog = () => {
        this.setState({
            ...initialState
        });
        this.props.onCloseDialog();
    }

    persistChange = () => {
        const {cityError, descriptionError, timeError} = this.state.inputsValidation 
        if (!cityError && !descriptionError && !timeError){
            let weather = null;
            getWeather(this.state.selectedCity).then(response => {
                weather = (response.data && response.data.weather) ? response.data.weather[0].main : ""
            })
            .catch(error => {
                alert(error)
            }).finally(() => {
                const event = {
                    hour: this.state.selectedTime,
                    city: this.state.selectedCity,
                    color: this.state.color,
                    description: this.state.description,
                    id: this.state.id,
                    weather: weather
                };
                if (this.state.id) {
                    this.props.onUpdateEvent(this.props.selectedDay,event);
                } else {
                    const idDate = new Date();
                    event.id = idDate.getTime();
                    this.props.onAddEvent(this.props.selectedDay,event);
                }
                this.toggleAddEdit()
            })
            
            
        }
    }

    handleChangeDesc = event => {
        const oldState = this.state;
        const validationRules = {
            ...oldState.inputsValidation,
            descriptionError: (!event.target.value) && oldState.inputsValidation.descriptionTouched
        }
        this.setState({
            ...oldState, 
            description: event.target.value,
            inputsValidation: validationRules 
        });
    }

    handleChangeCity = event => {
        const oldState = this.state;
        const validationRules = {
            ...oldState.inputsValidation,
            cityError: (!event.target.value) && oldState.inputsValidation.cityTouched
        }
        this.setState({
            ...oldState, 
            selectedCity: event.target.value,
            inputsValidation:validationRules
        });
    }

    handleChangeTime = selectedTime => {
        const oldState = this.state;
        const validationRules = {
            ...oldState.inputsValidation,
            timeError: (!selectedTime)  && oldState.inputsValidation.timeTouched
        }
        this.setState({
            ...oldState, 
            selectedTime,
            inputsValidation:validationRules
        });
    }


    handleChangeComplete = (event) => {
        const oldState = this.state;
        const validationRules = {
            ...oldState.inputsValidation,
            colorError: (!event.target.value)
        }
        this.setState({
            ...oldState,
            color: event.target.value,
            inputsValidation:validationRules
        });
    };

    onEditEvent = (event) => {
        const oldState = this.state
        this.setState({
            ...oldState,
            selectedTime: event.hour || "",
            description: event.description || "",
            selectedCity: event.city || "",
            color: event.color,
            id: event.id,
            showAddEdit: true,
            inputsValidation: {
                timeTouched: false,
                cityTouched: false,
                descriptionTouched: false,
                timeError: (!event.hour),
                cityError: (!event.city),
                descriptionError: (!event.description)
            }

        })
    }

    onDeleteEvent = event => {
        this.props.onRemoveEvent(this.props.selectedDay,event)
    }

    touchElement = elementName => {
        const validationRules = {...this.state.inputsValidation};
        validationRules[elementName] = true;
        this.setState({inputsValidation: validationRules})
    }

    render () {
        const selectedEventList = this.props.selectedEventList;
        const selectedDay = this.props.selectedDay;
        const eventList = (selectedEventList) ? selectedEventList.map((event,index) => (
                <EventListElement
                    key={selectedDay + 'EventList' + index}
                    event={event} selectedDay={selectedDay} 
                    onClickEdit={() => this.onEditEvent(event)}
                    onClickDelete={() => this.onDeleteEvent(event)} 
                />
        ))
        : null;

       
        return (
            <Modal show={this.props.showSystemPopup} click={this.resetAndCloseDialog}>
                <div className={Classes.EventListHeader}>
                    <h2>List of Events for {selectedDay}</h2>
                    <div onClick={this.resetAndCloseDialog} style={{cursor:'pointer', position: 'fixed', top:'10px', right:'15px'}}><FaTimesCircle color="#ACACAC"/></div>
                </div>
                {eventList}
                {
                    (!this.state.showAddEdit) ? (
                        <div className={Classes.AddEventButtonsBar}>
                            <div>
                                <Button 
                                        className={Classes.AddNewButton} 
                                        size="small"
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<FaRegCalendarPlus size={16} />}
                                        onClick={this.toggleAddEdit} >
                                    Add New
                                </Button></div>
                            <div>
                                <Button 
                                        size="small" 
                                        onClick={() => this.props.onRemoveAllEvents(this.props.selectedDay)} 
                                        className={Classes.DeleteAllButton} variant="contained" 
                                        color="secondary"  startIcon={<FaTrash size={16} />}>
                                    Delete All
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{paddingTop: '20px', textAlign:'initial', borderBottom: '1px #282c34 solid'}}><label style={{fontWeight: '700'}}>New Event</label></div>
                            <div className={Classes.EventInputs}>
                                <div className={Classes.EventInput}>
                                    <label>Color {(this.state.inputsValidation.colorError) ? (<i style={{color:"#DA3E06"}}>*</i>) : null}</label>
                                    <input type="color" id="favcolor" name="favcolor" value={this.state.color} onChange={this.handleChangeComplete} onFocus={() => this.touchElement("colorTouched")}/>
                                </div>
                                <div className={Classes.EventInput}>
                                    <label>Time {(this.state.inputsValidation.timeError) ? (<i style={{color:"#DA3E06"}}>*</i>) : null}</label>
                                    <TimePicker clockIcon={null} clearIcon={null} disableClock={true}
                                        onChange={this.handleChangeTime}
                                        value={this.state.selectedTime}
                                        onClick={() => this.touchElement("timeTouched")}
                                    />
                                </div>
                                <div className={Classes.EventInput}>
                                    <label>Description{(this.state.inputsValidation.descriptionError) ? (<i style={{color:"#DA3E06"}}>*</i>) : null}</label>
                                    <input type="text" maxLength={30} value={this.state.description} onChange={this.handleChangeDesc} onFocus={() => this.touchElement("descriptionTouched")}></input>
                                </div>
                                <div className={Classes.EventInput}>
                                    <label>City name{(this.state.inputsValidation.cityError) ? (<i style={{color:"#DA3E06"}}>*</i>) : null}</label>
                                    <input type="text" maxLength={30} value={this.state.selectedCity} onChange={this.handleChangeCity} onFocus={() => this.touchElement("cityTouched")}></input>
                                </div>
                            </div>
                            <div className={Classes.AddEventButtonsBar}>
                                <div>
                                    <Button 
                                        onClick={() => this.persistChange(false)} className={Classes.AddNewButton} 
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<FaCheck size={16} />} 
                                        size="small">
                                        Accept
                                    </Button></div>
                                <div>
                                    <Button 
                                        onClick={this.toggleAddEdit} className={Classes.DeleteAllButton} 
                                        variant="contained" 
                                        size="small" 
                                        color="secondary"  
                                        startIcon={<FaTimes size={16} />}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                )}
            </Modal>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedEventList: state.selectedEvents,
        showSystemPopup: state.showSystemPopup,
        selectedDay: state.selectedDay
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onCloseDialog: () => dispatch(actions.closeDialog()),
        onAddEvent: (selectedDay,event) => dispatch(actions.addCalendarEvent(selectedDay,event)),
        onRemoveEvent: (selectedDay,event) => dispatch(actions.removeCalendarEvent(selectedDay,event)),
        onUpdateEvent: (selectedDay,event) => dispatch(actions.updateCalendarEvent(selectedDay,event)),
        onRemoveAllEvents: (selectedDay) => dispatch(actions.removeAllCalendarEvents(selectedDay))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EventList);