"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Matrix_instances, _Matrix_createMatrix, _Matrix_initMatrix, _Matrix_setColumns, _Matrix_setVerticalPosition, _Matrix_avoidOverlap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matrix = void 0;
const __1 = require("../");
const rows = 1440;
class Matrix {
    constructor(events, width) {
        _Matrix_instances.add(this);
        this.events = events;
        this.width = width;
        this.width = width;
        this.slots = events.map(e => {
            return Object.assign(Object.assign({}, e), { start: new Date(e.start), end: new Date(e.end) });
        }).sort((e1, e2) => e1.start.getTime() - e2.start.getTime())
            .sort((e1, e2) => e1.end.getTime() - e2.end.getTime())
            .map(e => new __1.Slot(e));
        this.matrix = __classPrivateFieldGet(this, _Matrix_instances, "m", _Matrix_createMatrix).call(this, rows, this.slots.length);
    }
    process() {
        this.slots.forEach((slot, i) => __classPrivateFieldGet(this, _Matrix_instances, "m", _Matrix_initMatrix).call(this, this.matrix, slot, i));
        __classPrivateFieldGet(this, _Matrix_instances, "m", _Matrix_setColumns).call(this);
        __classPrivateFieldGet(this, _Matrix_instances, "m", _Matrix_setVerticalPosition).call(this);
        return this.slots;
    }
}
exports.Matrix = Matrix;
_Matrix_instances = new WeakSet(), _Matrix_createMatrix = function _Matrix_createMatrix(rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = null;
        }
    }
    return matrix;
}, _Matrix_initMatrix = function _Matrix_initMatrix(matrix, slot, i) {
    const startDate = __1.Slot.minute(slot.event.start);
    const endDate = __1.Slot.minute(slot.event.end);
    slot.rows = endDate - startDate;
    for (let t = startDate; t < endDate; t++) {
        matrix[t][i] = slot;
    }
}, _Matrix_setColumns = function _Matrix_setColumns() {
    let maxCol = 0;
    for (let i = 0; i < this.matrix.length; i++) {
        let count = this.matrix[i].filter(cell => cell !== null).length;
        this.matrix[i]
            .filter(slot => slot !== null)
            .forEach(slot => slot.cols = Math.max(slot.cols, count));
        if (count > maxCol)
            maxCol = count;
        count = 0;
    }
    return maxCol;
}, _Matrix_setVerticalPosition = function _Matrix_setVerticalPosition() {
    this.matrix.forEach((slots, i) => {
        let x = 0;
        slots
            .filter(slot => slot !== null)
            .forEach(slot => {
            slot.rectangle.x = Math.max(x, slot.rectangle.x);
            slot.rectangle.width = this.width / slot.cols;
            x += slot.rectangle.width;
        });
    });
    __classPrivateFieldGet(this, _Matrix_instances, "m", _Matrix_avoidOverlap).call(this);
}, _Matrix_avoidOverlap = function _Matrix_avoidOverlap() {
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
};
