// node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// linkList
class LinkList {
  constructor(next) {
    this.head = next || null;
    this.length = 0;
  }

  append(node) {
    if (!this.head) {
      this.next = node;
    } else {

      let last = this.head;
      while(last.next) {
        last = last.next;
      }

      last.next = node;
    }

    this.length ++;


  }
}