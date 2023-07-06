import { ILayout, ISlot, IEvent } from "../lib";
export declare class Matrix implements ILayout {
    #private;
    events: IEvent[];
    width: number;
    slots: ISlot[];
    matrix: (ISlot | null)[][];
    constructor(events: IEvent[], width: number);
    process(): ISlot[];
}
