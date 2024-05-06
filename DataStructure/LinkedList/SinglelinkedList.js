class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  // 开始位置插入
  unshift = (data) => {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }
  // 最后插入
  push = (data) => {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }
  // 特定位置插入
  insertAtPostion = (position, data) => {
    const newNode = new Node(data);

    let current = this.head;
    for (let index = 0; index < position; index++) {
      if (current.next) {
        current = current.next;
      }
    }
    newNode.next = current.next;
    current.next = newNode;
  }

  // 删除开始位置
  shift = () => {
    this.head = this.head.next;
  }

  // 删除末尾位置
  pop = () => {
    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
  }
  // 特定位置删除
  removeAtPosition = (position) => {
    let current = this.head;
    let prev = null;
    for (let index = 0; index < position; index++) {
      if (current.next) {
        prev = current;
        current = current.next;
      }
    }
    prev.next = current.next;
  }

  // 反转链表
  reverse = () => {
    let current = this.head;
    let prev = null;
    let next = null;
    while (current.next) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }

  traversal = () => {
    let current = this.head;
    let count = 1;
    while (current.next) {
      current = current.next;
      count ++;
    }
    return count;
  }

  getLength = () => this.traversal();
}

const linkedList = new LinkedList();

linkedList.push(1);
linkedList.push(2);
linkedList.unshift(5);
linkedList.push(3);
linkedList.push(4);
linkedList.insertAtPostion(3, 9);
// linkedList.removeAtPosition(1);

console.log('list1', linkedList);
// linkedList.reverse();
console.log('reverse list', linkedList);
