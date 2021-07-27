import { node } from "webpack";

export default class JobBST<T> {
  root:Node<T>;

  constructor() {
    this.root = null;
  }

  add(score:number, value:T):void {
    if(!this.root) this.root = new Node<T>(score, value);
    else if(this.root.score === score) this.root.list.push(value);
    else {
      let node = this.root;
      while(true) {
        if(score < node.score) {
          if(node.left) node = node.left;
          else {
            node.left = new Node<T>(score, value);
            return;
          }
        }
        else if(score > node.score) {
          if(node.right) node = node.right;
          else {
            node.right = new Node<T>(score, value);
            return;
          }
        }
        else {
          node.list.push(value);
          return;
        }
      }
    }
  }

  inOrder():any[] {
    if(!this.root) return [];
    
    const helper = (node:Node<T>):any[] => {
      let result = [];
      if(node.right) result = result.concat(helper(node.right));
      result = result.concat(node.list);
      if(node.left) result = result.concat(helper(node.left));
      return result;
    }

    return helper(this.root);
  }
}

class Node<T> {
  score: number;
  list: T[];
  left: Node<T>;
  right: Node<T>;

  constructor(score:number, value:T) {
    this.score = score;
    this.list = [value];
    this.left = null;
    this.right = null;
  }
}