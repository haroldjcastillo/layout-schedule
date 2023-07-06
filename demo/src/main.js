import {Calendar, Matrix} from '../../src'
import data from './input.json'

const calendarDiv = document.getElementById("calendar");
const inputTextarea = document.getElementById("json");
inputTextarea.value = JSON.stringify(data, null, 2);
drawCalendar(calendarDiv, data);

inputTextarea.addEventListener("input", (e) => {
    try {
        const input = JSON.parse(e.target.value);
        console.log(input.length);
        drawCalendar(calendarDiv, input);
    } catch (error) {
        console.error(error);
    }
});

function drawCalendar(element, input) {
    element.innerHTML = '';
    const instance = (width, _, events) => new Matrix(events, width);
    calendar = new Calendar(calendarDiv.clientWidth, element.clientHeight, input, instance);
    calendar.draw(drawSlots(element));
}

function drawSlots(element) {
    
    return function (slot) {
        const randomColor = () => {
            return Math.floor(Math.random() * 255)
        }
        const div = document.createElement("div")
        div.style.backgroundColor = `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.4)`;
        div.style.padding = '2px 0px 0px 2px';
        div.style.position = 'absolute';
        div.style.boxSizing = 'border-box';
        div.style.left = `${slot.rectangle.x}px`;
        div.style.top = `${slot.rectangle.y}px`;
        div.style.width = `${slot.rectangle.width}px`;
        div.style.height = `${slot.rectangle.height}px`;
        div.style.border = '0.5px solid';
        div.style.fontSize = '12px'
        div.innerText = `${slot.event.id} → ${dateToString(slot.event.start)} to ${dateToString(slot.event.end)}`;
    
        element.append(div);
    }
}


function dateToString(date) {
    return `${date.getHours()}:${date.getMinutes()}`;
}

// Side hours panel

const hoursDiv = document.getElementById("hours");

for (let i = 0; i < 24; i++) {
    let hour = i < 10 ? `0${i}` : i;
    let div = getHourDiv(hour);
    hoursDiv.append(div); 
}

function getHourDiv(hour) {
    const div = document.createElement("div")
    div.style.padding = '2px 0px 0px 2px';
    div.style.height = `60px`;
    div.style.boxSizing = 'border-box';
    div.style.border = '0.5px solid';
    div.innerText = `${hour}:00`;
    return div;
}