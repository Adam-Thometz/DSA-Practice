import React from "react";
import "./tree.css";
import { TreeViz } from "./tree-visualizer";
import _ from "lodash";

class Tree {
  constructor() {
    this.root = null;
  }
  
  add(val) {
    if (!this.root) {
      this.root = new Node(val);
    } else {
      this.root.add(val)
    }
  }
  toObject() {
    return this.root;
  }
}

class Node {
  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value;
    this.height = 1;
  }
  add(value) {
    // decide to go left or right

    // find the correct place to add
    // make sure you're updating height
    if (value < this.value) {
      // go left
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new Node(value);
      }
      if (!this.right || this.right.height < this.left.height) {
        this.height = this.left.height + 1;
      } 
    } else {
      // go right
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new Node(value);
      }
      if (!this.left || this.right.height > this.left.height) {
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }
  balance() {
    // ask is this node out of balance (difference of 2 in heights)
    // if not out of balance, do nothing
    // if out of balance, ask if I need to single- or double-rotate
    // if single, call rotate on self
    // if double, call rotate on child then on self
    const rightHeight = this.right ? this.right.height : 0;
    const leftHeight = this.left ? this.left.height : 0;

    if (leftHeight > rightHeight + 1) {
      const leftRightHeight = this.left.right ? this.left.right.height : 0;
      const leftLeftHeight = this.left.left ? this.left.left.height : 0;

      // double rotation
      if (leftRightHeight > leftLeftHeight) {
        this.left.rotateRR();
      }
      
      this.rotateLL();
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right.right ? this.right.right.height : 0;
      const rightLeftHeight = this.right.left ? this.right.left.height : 0;
      
      // double rotation
      if (rightLeftHeight > rightRightHeight) {
        this.right.rotateLL();
      }

      this.rotateRR();
    }
  }
  rotateRR() {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right.value;
    this.left = this.right;
    this.right = this.right.right;
    this.left.right = this.left.left;
    this.left.left = leftBefore;
    this.left.value = valueBefore;
    this.left.updateInNewLocation();
    this.updateInNewLocation();
  }
  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left.value;
    this.right = this.left;
    this.left = this.left.left;
    this.right.left = this.right.right;
    this.right.right = rightBefore;
    this.right.value = valueBefore;
    this.right.updateInNewLocation();
    this.updateInNewLocation();
  }
  updateInNewLocation() {
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (
      !this.right ||
      (this.left && this.right.height < this.left.height)
    ) {
      this.height = this.left.height + 1;
    } else {
      this.height = this.right.height + 1;
    }
  }
}

export default function TreeComponent() {
  const nums = _.shuffle(_.range(1000));
  const tree = new Tree();
  nums.map((num) => tree.add(num));
  const objs = tree.toObject();
  return <TreeViz root={objs} />;
}
