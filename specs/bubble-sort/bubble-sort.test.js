/*
  Write a bubble sort here
  Name the function bubbleSort
  Return the sorted array at the end
  
  To run the tests, change the `test.skip(…)` below to `test(…)`
  
  Bubble sort works by comparing two adjacent numbers next to each other and then
  swapping their places if the smaller index's value is larger than the larger
  index's. Continue looping through until all values are in ascending order
*/

// Time: O(n^2)
// Space: O(1)
// Stable (if two values are equal, they stay in that order)
// Destructive (operates on the array itself, rather than create a new array)

/*
  For each index of the array starting at the end
    Create swapped variable, set to false
    For each index from the start to i-1
      If nums at j is greater than nums at j+1
        swap
        if not swapped, set swapped to true
    If not swapped, return nums
*/

function bubbleSort(nums) {
  const swap = (curr, next) => [nums[curr], nums[next]] = [nums[next], nums[curr]];
  
  for (let i = nums.length - 1; i >= 0; i--) {
    let swapped = false;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j+1]) {
        swap(j, j+1);
        swapped = true;
      };
    };
    if (!swapped) return nums;
  };
};

// unit tests
// do not modify the below code
test("bubble sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const sortedNums = bubbleSort(nums);
  expect(sortedNums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
