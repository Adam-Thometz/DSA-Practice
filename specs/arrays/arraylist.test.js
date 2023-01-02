/*
  ArrayList
  
  We are going to approximate an implementation of ArrayList. In JavaScript terms, that means we are
  going to implement an array using objects. You should not use arrays at all in this exercise, just
  objects. Make a class (or constructor function; something you can call new on) called ArrayList.
  ArrayList should have the following properties (in addition to whatever properties you create):
  
  length - integer  - How many elements in the array
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class ArrayList {
  constructor() {
    // instantiate all variables
    this.data = {};
    this.length = 0;
  }
  push(val) {
    // add an item to the end of an array
    this.data[this.length] = val;
    this.length++;
  }
  pop() {
    // remove the last item in the array and returns it
    const val = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return val;
  }
  unshift(val) {
    // add an item to the beginning of an array
    this._expandFrom(0);
    this.data[0] = val;
  }
  shift() {
    // remove the first item in an array and returns it
    const val = this.data[0];
    this._collapseTo(0);
    return val;
  }
  get(idx) {
    // returns the item at the index
    return this.data[idx];
  }
  delete(idx) {
    // removes item from array and collapses it
    const val = this.data[idx];
    this._collapseTo(idx);
    return val;
  }
  _collapseTo(idx) {
    for (let i = idx; i < this.length; i++) {
      this.data[i] = this.data[i+1];
    }
    delete this.data[this.length-1];
    this.length--;
  }
  _expandFrom(idx) {
    for (let i = this.length-1; i >= idx; i--) {
      this.data[i] = this.data[i+1];
    }
    this.length++;
  }
}

// unit tests
// do not modify the below code
describe("ArrayList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new ArrayList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(ArrayList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("unshift", () => {
    list.unshift('first');
    expect(list.get(0)).toBe('first');
    expect(list.length).toBe(1);
    list.unshift('second');
    expect(list.get(0)).toBe('second');
    expect(list.length).toBe(2);
  });

  test("shift", () => {
    abcRange(5).map((character) => list.push(character));
    expect(list.length).toEqual(5);
    range(3).map(() => list.shift());
    expect(list.length).toEqual(2);
    expect(list.shift()).toEqual("d");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
