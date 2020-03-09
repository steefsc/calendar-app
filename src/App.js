import React from 'react';
import * as datejs from 'datejs';
import * as actions from './store/actions/index'
import './App.css';
import Classes from './App.module.css';

import DayTile from './components/DayTile/DayTile';
import EventList from './containers/EventList/EventList'

import { connect } from 'react-redux';

import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'

function App(props) {
  const firstDayOfTheMonth = Date.today().addMonths(props.monthsCounter || 0).moveToFirstDayOfMonth()
  
  const remainingDays = firstDayOfTheMonth.getDay();
  const selectedMonth = firstDayOfTheMonth.getMonth();
  const selectedYear = firstDayOfTheMonth.getUTCFullYear();
  let firstDayOfCalendar = firstDayOfTheMonth.addDays(-remainingDays-1)
  const monthsHeader = [...Array(7).keys()].map(day => (
    <div key={day} className={Classes.DayHeaderTile}>
      <label>{Date.getDayName(day)}</label>
    </div>
  ))
  

  const days = [...Array(35).keys()].map(day => {
    const currentDay = firstDayOfCalendar.day(); 
    const currentMonth = firstDayOfCalendar.getMonth();
    const isDifferentMonth = selectedMonth !== currentMonth
    const isWeekend =  [0,6].includes(currentDay.getDay());
    const monthKey = currentDay.getUTCFullYear() + "-" + Date.getMonthName(currentDay.getMonth())

    return (
      <DayTile  currentDay={currentDay.getDate()} 
                day={day}
                key={day}
                dateKey={monthKey + '-' + currentDay.getDate()}
                isWeekend={isWeekend} 
                isDifferentMonth={isDifferentMonth}/>
    )
  })

  return (
    <div className="App">
      <div className={Classes.AppBar}>
        <div onClick={() => props.onChangeMonthsCounter(-1)} style={{cursor:'pointer', display: 'flex', alignItems: 'center'}}><FaAngleLeft/> Prev Month</div>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <div><b>My Calendar App</b></div>
        <div>{Date.getMonthName(selectedMonth)}, {selectedYear}</div>
        </div>
        <div onClick={() => props.onChangeMonthsCounter(1)} style={{cursor:'pointer', display: 'flex', alignItems: 'center'}}>Next Month <FaAngleRight/></div>
      </div>
      <div className={Classes.DaysBar}>
          {monthsHeader}
      </div>
      <div className={Classes.Days}>
          {days}
      </div>
      <EventList />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    monthsCounter: state.monthsCounter
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onChangeMonthsCounter: (value) => dispatch(actions.onChangeMonthsCounter(value)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
