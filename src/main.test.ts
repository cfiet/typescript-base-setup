import { hello } from "./main";

test("hello() returns expected message", () => {
    expect(hello()).toEqual("Hello world");
});