export interface ILayout {
    process(): ISlot[]
}

export interface IEvent {
    id: string
    start: Date
    end: Date
}

export interface IRectangle {
    x: number
    y: number
    width: number
    height: number
}

export interface ISlot {
    event: IEvent;
    rows: number;
    cols: number;
    rectangle: IRectangle;

    draw<T>(fn: (slot: ISlot) => T): void;
    overlaps(other: ISlot): boolean;
}

export interface ICalendar {
    events: IEvent[]
    width: number
    height: number
    instance: ILayout
    draw<T>(fn: (slot: ISlot) => T) : void;
}