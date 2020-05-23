import fc from "fast-check";

import Vector2 from "./vector2";

test("length calculation", () => fc.assert(fc.property(fc.double(), fc.double(), (x, y) => {
    const vec = Vector2.fromValues(x, y);

    expect(vec.length()).toEqual(Math.sqrt(x * x + y * y));
})));

test("conversion to unit vector", () => fc.assert(fc.property(fc.double(), fc.double(), (x, y) => {
    fc.pre(x !== 0 || y !== 0);

    const len = Math.sqrt(x * x + y * y);
    const vec = Vector2.fromValues(x, y);

    vec.unit();
    expect(vec.x).toBeCloseTo(x / len);
    expect(vec.y).toBeCloseTo(y / len);
    expect(vec.length()).toBeCloseTo(1.0);
})));

test("copying vector", () => fc.assert(fc.property(fc.double(), fc.double(), (x, y) => {
    const vec = Vector2.fromValues(x, y);
    const copy = vec.copy();

    expect(copy).not.toBe(vec);
    expect(copy).toEqual(vec);
})));

test("adding vectors", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), fc.double(), (x1, y1, x2, y2) => {
    const left = Vector2.fromValues(x1, y1);
    const right = Vector2.fromValues(x2, y2);
    const rightCopy = right.copy();

    const result = left.add(right);

    expect(result).toBe(left);
    expect(left).toEqual(Vector2.fromValues(x1 + x2, y1 + y2));
    expect(right).toEqual(rightCopy);
})));

test("substracting vectors", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), fc.double(), (x1, y1, x2, y2) => {
    const left = Vector2.fromValues(x1, y1);
    const right = Vector2.fromValues(x2, y2);
    const rightCopy = right.copy();

    const result = left.sub(right);

    expect(result).toBe(left);
    expect(left).toEqual(Vector2.fromValues(x1 - x2, y1 - y2));
    expect(right).toEqual(rightCopy);
})));

test("multiplying vector by a constant", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), (x, y, a) => {
    const vec = Vector2.fromValues(x, y);
    const result = vec.mul(a);

    expect(result).toBe(vec);
    expect(result).toEqual(Vector2.fromValues(x * a, y * a));
})));

test("dividing vector by a constant", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), (x, y, a) => {
    const vec = Vector2.fromValues(x, y);
    const result = vec.div(a);

    expect(result).toBe(vec);
    expect(result).toEqual(Vector2.fromValues(x / a, y / a));
})));

test("calculating vector direction", () => fc.assert(fc.property(fc.double(), fc.double(), (x, y) => {
    fc.pre(x !== 0 || y !== 0);

    const vec = Vector2.fromValues(x, y);
    expect(vec.angle()).toEqual(Math.atan2(y, x));
})));

test("rotating vector by an angle", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), (x, y, theta) => {
    const vec = Vector2.fromValues(x, y);

    const res = vec.rotate(theta);
    expect(res).toBe(vec);
    expect(res).toEqual(Vector2.fromValues(
        x * Math.cos(theta) - y * Math.sin(theta),
        x * Math.sin(theta) + y * Math.cos(theta)
    ));
})));

test("dot product of vectors", () => fc.assert(fc.property(fc.double(), fc.double(), fc.double(), fc.double(), (x1, y1, x2, y2) => {
    const left = Vector2.fromValues(x1, y1);
    const right = Vector2.fromValues(x2, y2);

    const res = left.dot(right);
    expect(res).toBeCloseTo(x1 * x2 + y1 * y2);
})));
