import { Matrix } from "../src/layout/matrix";

import * as chai from 'chai';

const expect = chai.expect;

describe('Matrix Layout', () => {

    it('should be able to layout simple', () => {
        let matrix = new Matrix([{
            "id": "1",
            "start": new Date("2023-06-13T09:00:00"),
            "end": new Date("2023-06-13T09:35:00"),
        },
        {
            "id": "4",
            "start": new Date("2023-06-13T09:35:00"),
            "end": new Date("2023-06-13T10:00:00"),
        }], 400);
        expect(matrix.process()).to.have.length(2);
    });

});