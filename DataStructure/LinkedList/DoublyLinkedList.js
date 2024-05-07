class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    // 尾部节点引用
    this.tail = null;
  }

  // 在链表末尾插入节点
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  // 在链表头部插入节点
  unshift(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  // 在指定位置插入节点
  insertAtPosition(position, value) {
    if (position <= 0) {
      this.unshift(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.head;
    let index = 0;

    while (current !== null && index < position) {
      current = current.next;
      index++;
    }

    if (current !== null) {
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
    } else {
      this.push(value);
    }
  }

  // 删除链表末尾的节点
  pop() {
    if (!this.tail) {
      return;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.tail = this.tail.prev;
    this.tail.next = null;
  }

  // 删除链表头部的节点
  shift() {
    if (!this.head) {
      return;
    }

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return;
    }

    this.head = this.head.next;
    this.head.prev = null;
  }

  // 删除位于指定位置的节点
  removeAtPosition(position) {
    if (position < 0) {
      return;
    }

    let current = this.head;
    let index = 0;

    while (current !== null && index < position) {
      current = current.next;
      index++;
    }

    if (current !== null) {
      if (current.prev !== null) {
        current.prev.next = current.next;
      } else {
        // current是头节点
        this.head = current.next;
      }

      if (current.next !== null) {
        current.next.prev = current.prev;
      } else {
        // current是尾节点
        this.tail = current.prev;
      }
    }
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.push(1);
doublyLinkedList.push(2);
doublyLinkedList.unshift(3);
doublyLinkedList.insertAtPosition(2, 6);

console.log('doublyLinkedList', doublyLinkedList);
