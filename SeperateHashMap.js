class _Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  addItem({ key, value }) {
    if (!this.head) {
      this.head = new _Node({ key, value });
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = new _Node({ key, value });
  }
  isEmpty() {
    return this.head ? false : true;
  }
  getItemByKey(key) {
    let current = this.head;
    while (current) {
      if (current.data.key === key) return current.data.value;
      current = current.next;
    }
    throw new Error("key Error");
  }
  keyExists(key) {
    let current = this.head;
    while (current) {
      if (current.data.key === key) return true;
      current = current.next;
    }
    return false;
  }
  replaceDataAtKey({ key, value }) {
    let current = this.head;
    while (current) {
      if (current.data.key === key) {
        current.data = { key, value };
        return
      }
      current = current.next;
    }
  }
}

class SeperateHashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._deleted = 0;
    this._capacity = initialCapacity;
    this._hashTable = [];
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key) {
    const index = this._findIndex(key);
    if (this._hashTable[index] === undefined) {
      throw new Error("key error");
    }
    const list = this._hashTable[index];
    return list.getItemByKey(key);
  }
  set(key, value) {
    const currentRatio = (this.length + this._deleted + 1) / this._capacity;
    if (currentRatio > SeperateHashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * SeperateHashMap.SIZE_RATIO);
    }
    const index = this._findIndex(key);

    if (!this._hashTable[index]) {
      this._hashTable[index] = new LinkedList();
      this._hashTable[index].addItem({ key, value });
      this.length++;
      return;
    }
    const list = this._hashTable[index];

    //check for key
    if (list.keyExists(key)) {
      list.replaceDataAtKey({ key, value });
      return;
    }
    list.addItem({ key, value });
  }
  _findIndex(key) {
    const hash = SeperateHashMap._hashString(key);
    return hash % this._capacity;
  }
  _resize(capacity) {
    const oldTable = this._hashTable;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];
    this._capacity = capacity;

    for (const slot of oldTable) {
      if (slot) {
        let current = slot.head;
        while (current) {
          this.set(current.data.key, current.data.value);
          current = current.next;
        }
      }
    }
  }
}

module.exports = { SeperateHashMap };
