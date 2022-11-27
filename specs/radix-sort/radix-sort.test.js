/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/



function getDigit(number, place, largestPlace) {
  const string = number.toString();
  const mod = largestPlace - string.length;
  return string[place - mod] || 0;
}

// get the length of the longest number
function getLargestPlace(nums) {
  return Math.max(...nums).toString().length;
}

function radixSort(array) {
  // find largest place
  const largestPlace = getLargestPlace(array);
  // create how many buckets you need, an array of 10 arrays
  const buckets = new Array(10).fill().map(() => []);
  // for loop for how many iterations you need to do, based on largest place
  for (let i = largestPlace - 1; i >= 0; i--) {
    // while loop
    while (array.length) {
      // enqueue the numbers into buckets
      const current = array.shift();
      buckets[getDigit(current, i, largestPlace)].push(current);
    }

    // for each bucket
    for (let bucket of buckets) {
      // dequeue all results
      while (bucket.length) {
        array.push(bucket.shift());
      }
    }
  }
  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
