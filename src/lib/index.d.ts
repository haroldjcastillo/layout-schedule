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

    draw(fn: (slot: ISlot) => HTMLElement): HTMLElement;
    overlaps(other: ISlot): boolean;
}

export interface ICalendar {
    element: HTMLElement
    events: IEvent[]
    width: number
    height: number
    instance: ILayout
}