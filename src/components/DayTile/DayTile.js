import React from 'react';
import Classes from './DayTile.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const dayTile = (props) => {
    const className = [ Classes.DayTile, 
                        (props.day === 0 || (props.day + 1) % 7 !== 0) ? Classes.RightBorder : "",
                        (props.day < 28) ? Classes.BottomBorder : "",
                        (props.isWeekend) ? Classes.WeekendBackground : "",
                        (props.isDifferentMonth) ? Classes.DifferentMonth : ""
                    ]

    const dayEventList = (props.events[props.dateKey]) ? props.events[props.dateKey] : null;

    const eventList = (dayEventList) ? dayEventList.map( (event, index) => {
        const classes = []
        classes.push(Classes.EventListElement)
        return (
            <p className={classes.join(' ')} key={props.keyDate + '-' + index} style={{backgroundColor: event.color}}> <label style={{fontWeight: 600}}>{event.hour}</label> <label> {event.description}</label></p>
    )}): null

    return (
        <div key={props.dateKey} className={className.join(" ")} onClick={() => props.onOpenEventList(props.dateKey,dayEventList)}>
          <div style={{'display':'flex', 'fontSize': 'x-small'}}><label>{props.currentDay}</label></div>
          <div className={Classes.DayReminderContainer}>{eventList}</div>        
        </div>
      )
} 

const mapStateToProps = state => {
    return {
      showSystemPopup: state.showSystemPopup,
      systemPopUpMessage: state.systemPopUpMessage,
      events: state.events
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        onOpenEventList: (dateKey, dayEventList) => dispatch(actions.openDayEvents(dateKey,dayEventList)),
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(dayTile)