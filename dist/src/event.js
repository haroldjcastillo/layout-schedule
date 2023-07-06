"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = exports.Slot = exports.Rectangle = void 0;
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
exports.Rectangle = Rectangle;
class Slot {
    constructor(event) {
        this.event = event;
        this.rows = 0;
        this.cols = 0;
        this.rectangle = new Rectangle(0, Slot.minute(event.start), 0, Slot.difference(event.start, event.end));
    }
    draw(fn) {
        return fn(this);
    }
    overlaps(other) {
        return ((this.rectangle.x < other.rectangle.x + other.rectangle.width) &&
            (this.rectangle.x + this.rectangle.width > other.rectangle.x) &&
            (this.rectangle.y < other.rectangle.y + other.rectangle.height) &&
            (this.rectangle.y + this.rectangle.height > other.rectangle.y));
    }
    static difference(start, end) {
        return (end.getTime() - start.getTime()) / 1000 / 60;
    }
    static minute(date) {
        return (date.getHours() * 60 + date.getMinutes()) % 1440;
    }
}
exports.Slot = Slot;
class Calendar {
    constructor(width, height, events, fn) {
        this.events = events;
        this.width = width;
        this.height = height;
        this.instance = fn(this.width, this.height, this.events);
    }
    draw(fn) {
        this.instance.process()
            .forEach(slot => slot.draw(fn));
    }
}
exports.Calendar = Calendar;
