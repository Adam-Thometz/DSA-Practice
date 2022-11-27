/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
  Performance is guaranteed regardless of the nature of the list
*/

// Time: O(n log(n))
// Space: O(n)

/*

*/

const merge = (left, right) => {
  const mergedArr = [];
  let leftPointer = 0;
  let rightPointer = 0;

  while (leftPointer < left.length && rightPointer < right.length) {
    if (left[leftPointer] < right[rightPointer]) {
      mergedArr.push(left[leftPointer]);
      leftPointer++;
    } else {
      mergedArr.push(right[rightPointer]);
      rightPointer++;
    };
  };

  return mergedArr.concat(left.slice(leftPointer), right.slice(rightPointer));
}

const mergeSort = (nums) => {
  if (nums.length < 2) return nums;
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  return merge(left, right);
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
