# 双向链表操作推荐
## 插入新节点X(重点先处理新节点的指向, 在处理原有节点指向)
### 中间位置A和B之间
1. 更新新节点X的指针(设置新节点的前后指针)
```js
  X.next = B; // a. 将新节点 X 的`next`指针指向 B
  X.prev = A; // c. 将新节点 X 的`prev`指针指向 A
```

2. 更新现有节点的指针以包括新节点
```js
  if (A != null) A.next = X; // b. 如果节点 A 存在，将 A 的`next`更新为 X
  if (B != null) B.prev = X; // d. 更新节点 B 的`prev`指针为 X
```

### 头部位置

```js
  prepend(value) {
    const newNode = new ListNode(value);
    newNode.next = this.head; // Step 2

    if (this.head) {
      this.head.prev = newNode; // Step 2 (if head exists)
    } else {
      this.tail = newNode; // Step 5 (if the list was empty)
    }

    this.head = newNode; // Step 3
  }
```

### 末尾位置

```js
  append(value) {
    const newNode = new ListNode(value);
    newNode.next = this.tail;

    if (this.tail) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }

    this.tail = newNode;
  }
```
### 中间特定位置插入

```js
  insertAtPosition(value, position) {
    const newNode = new ListNode(value);
    let current = newNode.next;
    let index = 0;
    while (current && index < position) {
      current = current.next;
      index++;
    }
    // 在中间
    if (current) {
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev.next = newNode;
      current.prev = newNode;
    } else {
      // 在尾部
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }
```

## 删除节点X

```js
  deleteAtHead() {
    // 链表为空，没有节点可以删除
    if (this.head === null) return;

    // 将头指针指向链表的下一个节点（可能为 null）
    this.head = this.head.next;

    // 如果链表中剩余的节点还存在（链表不止一个节点）
    if (this.head) {
        // 将新头节点的 prev 指针设置为 null
        this.head.prev = null;
    } else {
        // 链表现在为空，将尾指针也设置为 null
        this.tail = null;
    }
  }

  deleteAtTail() {
    // 如果链表为空，没有节点可以删除
    if (this.head === null) return;

    // 如果链表中只有一个节点
    if (this.head === this.tail) {
        this.head = null;
        this.tail = null;
        return;
    }

    // 在链表中有多于一个节点的情况下

    // 将尾部指针更新为倒数第二个节点
    this.tail = this.tail.prev;

    // 将新的尾节点的next指针设置为null，从而断开原尾部节点的连接
    this.tail.next = null;
  }

  deleteAtPosition(position) {
    if (position < 1 || this.head === null) {
        console.log("位置无效或链表为空");
        return;
    }

    if (position === 1) {
        this.deleteAtHead();
        return;
    }

    let current = this.head;
    let count = 1;
    
    // 遍历找到指定位置的节点
    while (current !== null && count < position) {
        current = current.next;
        count++;
    }

    if (current === null) {
        console.log("位置超出链表长度");
        return;
    }

    // 删除节点
    if (current.next !== null) {
        current.next.prev = current.prev;
    }
    if (current.prev !== null) {
        current.prev.next = current.next;
    }

    // 如果删除的是尾节点
    if (current === this.tail) {
      this.tail = current.prev;
    }
  }
```