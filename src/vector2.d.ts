export default class Vector2 {
    private _x;
    private _y;
    static fromObject(o: {
        x: number;
        y: number;
    }): Vector2;
    static fromValues(x: number, y: number): Vector2;
    static fromArray(arr: [number, number]): Vector2;
    private constructor();
    get x(): number;
    get y(): number;
    copy(): Vector2;
    length(): number;
    add(right: Vector2): Vector2;
    sub(right: Vector2): Vector2;
    mul(multipiler: number): Vector2;
    div(divider: number): Vector2;
    unit(): Vector2;
    angle(): number;
    dot(right: Vector2): number;
    rotate(rad: number): Vector2;
}
