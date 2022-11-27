/*
  Insertion sort!
  
  Be sure to call your function insertionSort!
  
  The idea here is that the beginning of your list is sorted and the everything else is assumed to be an unsorted mess.
  The outer loop goes over the whole list, the index of which signifies where the "sorted" part of the list is. The inner
  loop goes over the sorted part of the list and inserts it into the correct position in the array.
  
  Like bubble sort, there's a visualization mechanism available to you. Just call snapshot(myArray) at the beginning of
  your inner loop and it should handle the rest for you!
  
  And you put xdescribe instead of describe if you want to suspend running the unit tests.  
*/

// Time: O(n^2)
// Space: O(1)
// Destructive
// Stable
// Good for mostly sorted arrays

/*
  For each index of the array starting at idx 1 (i)
    For each index starting from i, going toward idx 1 (j)
      If nums at idx j is less than the idx before, swap the numbers
*/

function insertionSort(nums) {
  const swap = (currIdx, prevIdx) =>
    [nums[currIdx], nums[prevIdx]] = [nums[prevIdx], nums[currIdx]];

  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j >= 1; j--) {
      if (nums[j] < nums[j-1]) swap(j, j-1);
    }
  }

  return nums;
}

// unit tests
// do not modify the below code
test("insertion sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  insertionSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
