import { Slot } from "../";
import { ILayout, ISlot, IEvent } from "../lib";

const rows: number = 1440;

export class Matrix implements ILayout {
    slots: ISlot[];
    matrix: (ISlot | null)[][];

    constructor(public events: IEvent[], public width: number) {
        this.width = width
        this.slots = events.map(e => {
            return { ...e, start: new Date(e.start), end: new Date(e.end) }
        }).sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
            .sort((e1, e2) => e1.end.getTime() - e2.end.getTime())
            .map(e => new Slot(e));
        this.matrix = this.#createMatrix(rows, this.slots.length);
    }
    process(): ISlot[] {

        this.slots.forEach((slot, i) => this.#initMatrix(this.matrix, slot, i));
        this.#setColumns()
        this.#setVerticalPosition()

        return this.slots;
    }

    #createMatrix(rows: number, cols: number): (ISlot | null)[][] {
        const matrix: (ISlot | null)[][] = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = null;
            }
        }
        return matrix;
    }

    #initMatrix(matrix: (ISlot | null)[][], slot: ISlot, i: number) {
        const startDate = Slot.minute(slot.event.start);
        const endDate = Slot.minute(slot.event.end);
        slot.rows = endDate - startDate;
        for (let t = startDate; t < endDate; t++) {
            matrix[t][i] = slot;
        }
    }

    #setColumns() {
        let maxCol = 0;
        for (let i = 0; i < this.matrix.length; i++) {
            let count = this.matrix[i].filter(cell => cell !== null).length;
            this.matrix[i]
                .filter(slot => slot !== null)
                .forEach(slot => slot!.cols = Math.max(slot!.cols, count))
            if (count > maxCol) maxCol = count;
            count = 0;
        }
        return maxCol;
    }

    #setVerticalPosition() {
        this.matrix.forEach((slots, i) => {
            let x = 0;
            slots
                .filter(slot => slot !== null)
                .forEach(slot => {
                    slot!.rectangle.x = Math.max(x, slot!.rectangle.x);
                    slot!.rectangle.width = this.width / slot!.cols;
                    x += slot!.rectangle.width;
                });
        });

        this.#avoidOverlap();
    }

    #avoidOverlap() {
        const rows = this.matrix.length;
        const cols = this.matrix[0].length;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const slot = this.matrix[i][j];
                if (slot) {
                    let x = slot.rectangle.x;
                    let width = slot.rectangle.width;

                    // Check if the current slot overlaps with any previous slots in the same row
                    for (let k = j - 1; k >= 0; k--) {
                        const prevSlot = this.matrix[i][k];

                        if (prevSlot !== null && slot.overlaps(prevSlot)) {
                            console.log(prevSlot, slot);
                            const prevX = prevSlot.rectangle.x;
                            const prevWidth = prevSlot.rectangle.width;
                            const prevEnd = prevX + prevWidth;
                            const currEnd = x + width;
                            if (prevEnd > x) {
                                // Adjust the horizontal position of the current slot to avoid overlap
                                x = prevEnd;
                                width = currEnd - x;
                            }
                        }
                    }

                    slot.rectangle.x = x;
                    slot.rectangle.width = width;
                }
            }
        }
    }
}