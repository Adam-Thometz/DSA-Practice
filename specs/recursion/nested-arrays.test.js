/* 

  write a function that accepts an array that only contains
  two types of things: numbers and arrays. those nested arrays
  also only contain numbers and other, nested arrays.

  example: nestedAdd([1, 2, [3]]) = 6
           nestedAdd([[[2]], 1, [1, 3]]) = 7
 
 */

/*
  Set sum to 0
  For each element in array
    BASE CASE: If element is an array, call nestedArr on array and add result to sum
    Else add element to sum
  Return sum
*/

function nestedAdd(array) {
  let sum = 0
  for (let el of array) {
    Array.isArray(el) ? sum += nestedAdd(el) : sum += el;
  }
  return sum;
}

test("nested arrays addition", () => {
  expect(nestedAdd([1, 2, 3])).toEqual(6);
  expect(nestedAdd([1, [2], 3])).toEqual(6);
  expect(nestedAdd([[[[[[[[[5]]]]]]]]])).toEqual(5);
  expect(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
});
