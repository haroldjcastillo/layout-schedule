import { ICalendar, IEvent, ILayout, IRectangle, ISlot } from "./lib";

export class Rectangle implements IRectangle {
    x: number
    y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class Slot implements ISlot {
    event: IEvent;
    rows: number;
    cols: number;
    rectangle: IRectangle;

    constructor(event: IEvent) {
        this.event = event;
        this.rows = 0;
        this.cols = 0;
        this.rectangle = new Rectangle(0, Slot.minute(event.start), 0, Slot.difference(event.start, event.end))
    }

    draw<T>(fn: (slot: ISlot) => T): T {
        return fn(this)
    }

    overlaps(other: ISlot): boolean {
        return (
            (this.rectangle.x < other.rectangle.x + other.rectangle.width) &&
            (this.rectangle.x + this.rectangle.width > other.rectangle.x) &&
            (this.rectangle.y < other.rectangle.y + other.rectangle.height) &&
            (this.rectangle.y + this.rectangle.height > other.rectangle.y)
        );
    }

    static difference(start: Date, end: Date) {
        return (end.getTime() - start.getTime()) / 1000 / 60;
    }

    static minute(date: Date) {
        return (date.getHours() * 60 + date.getMinutes()) % 1440;
    }

}

export class Calendar implements ICalendar {
    events: IEvent[];
    width: number;
    height: number;
    instance: ILayout;

    constructor(width: number, height: number, events: IEvent[], fn: (width: number, height: number, events: IEvent[]) => ILayout) {
        this.events = events;
        this.width = width;
        this.height = height;
        this.instance = fn(this.width, this.height, this.events);
    }

    draw<T>(fn: (slot: ISlot) => T) {
        this.instance.process()
            .forEach(slot => slot.draw(fn));
    }

}