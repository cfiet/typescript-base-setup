export default class Vector2 {

    public static fromObject(o: { x: number, y: number }): Vector2 {
        return new Vector2(o.x, o.y);
    }

    public static fromValues(x: number, y: number): Vector2 {
        return new Vector2(x, y);
    }

    public static fromArray(arr: [number, number]): Vector2 {
        return new Vector2(arr[0], arr[1]);
    }

    private constructor(
        private _x: number = 0,
        private _y: number = 0
    ) { }

    get x() { return this._x; }
    get y() { return this._y; }

    copy(): Vector2 {
        return new Vector2(this._x, this._y);
    }

    length(): number {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    add(right: Vector2): Vector2 {
        this._x += right._x;
        this._y += right._y;
        return this;
    }

    sub(right: Vector2): Vector2 {
        this._x -= right._x;
        this._y -= right._y;
        return this;
    }

    mul(multipiler: number): Vector2 {
        this._x *= multipiler;
        this._y *= multipiler;
        return this;
    }

    div(divider: number): Vector2 {
        if (divider === 0) throw new Error("Cannot divide by 0");
        this._x /= divider;
        this._y /= divider;
        return this;
    }

    unit(): Vector2 {
        this.div(this.length());
        return this;
    }

    angle(): number {
        return Math.atan2(this._y, this._x);
    }

    dot(right: Vector2): number {
        return this._x * right._x + this._y * right._y;
    }

    rotate(rad: number): Vector2 {
        const x = this._x;
        const y = this._y;

        this._x = x * Math.cos(rad) - y * Math.sin(rad);
        this._y = x * Math.sin(rad) + y * Math.cos(rad);

        return this;
    }
}
