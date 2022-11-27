import React from "react";
import { shuffle, range } from "lodash";
import { App, snapshot, done, clear } from "./sort-visualizer";

import "./sort.css";

function sort(nums) {
  const swap = (currIdx, prevIdx) =>
    [nums[currIdx], nums[prevIdx]] = [nums[prevIdx], nums[currIdx]];

  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j >= 1; j--) {
      if (nums[j] < nums[j-1]) swap(j, j-1);
    }
    snapshot(nums);
  }

  snapshot(nums);
  return nums;
}

export default function SortComponent() {
  clear();
  sort(shuffle(range(100)));
  done();
  return <App />;
}
