import axios from 'axios';
export const sortEvents = (events) => {
    events.sort((oldEvent, newEvent) => {
        if (oldEvent.hour > newEvent.hour) 
            return 1;
        else if (oldEvent.hour < newEvent.hour) 
            return -1;
        else return 0
    });
    return events;
}

export const getWeather = (city) => {
    const KEY = '7ef2d6d155e15071ac3ee2909aa2288e'
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
}