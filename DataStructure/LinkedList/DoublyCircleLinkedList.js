class Node {
  constructor(data) {
      this.data = data;
      this.prev = this;
      this.next = this;
  }
}

class CircularDoublyLinkedList {
  constructor() {
      this.head = null;
      this.size = 0;
  }

  // 在链表头部新增节点
  addAtHead(data) {
      const newNode = new Node(data);
      if (this.head === null) {
          // 如果链表为空，新节点的 next 和 prev 指向自己
          this.head = newNode;
      } else {
          // 如果链表不为空，调整新节点和头节点的指针
          newNode.next = this.head;
          newNode.prev = this.head.prev;
          newNode.next.prev = newNode;
          newNode.prev.next = newNode;
          this.head = newNode;
      }
      this.size++;
  }

  // 在链表尾部新增节点
  addAtTail(data) {
      const newNode = new Node(data);
      if (this.head === null) {
          this.head = newNode;
      } else {
          // 调整新节点和尾节点的指针
          newNode.prev = this.head.prev;
          newNode.next = this.head;
          newNode.prev.next = newNode;
          newNode.next.prev = newNode;
      }
      this.size++;
  }

  // 删除头节点
  deleteHead() {
      if (this.size === 0) return; // 链表为空时不执行操作

      if (this.size === 1) {
          // 如果链表只有一个节点，删除后链表为空
          this.head = null;
      } else {
          // 调整尾节点的 next 和新头节点的 prev 指针
          this.head.next.prev = this.head.prev;
          this.head.prev.next = this.head.next;
          this.head = this.head.next;
      }
      this.size--;
  }

  // 删除尾节点
  deleteTail() {
      if (this.size === 0) return; // 链表为空时不执行操作

      if (this.size === 1) {
          this.head = null;
      } else {
          // 同样调整头节点的 prev 和新尾节点的 next 指针
          this.head.prev = this.head.prev.prev;
          this.head.prev.next = this.head;
      }
      this.size--;
  }
}

