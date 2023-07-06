import { ICalendar, IEvent, ILayout, IRectangle, ISlot } from "./lib";
export declare class Rectangle implements IRectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
}
export declare class Slot implements ISlot {
    event: IEvent;
    rows: number;
    cols: number;
    rectangle: IRectangle;
    constructor(event: IEvent);
    draw<T>(fn: (slot: ISlot) => T): T;
    overlaps(other: ISlot): boolean;
    static difference(start: Date, end: Date): number;
    static minute(date: Date): number;
}
export declare class Calendar implements ICalendar {
    events: IEvent[];
    width: number;
    height: number;
    instance: ILayout;
    constructor(width: number, height: number, events: IEvent[], fn: (width: number, height: number, events: IEvent[]) => ILayout);
    draw<T>(fn: (slot: ISlot) => T): void;
}
