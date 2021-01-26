class HashMap {
  constructor(initialCapacity = 8){
    this.length = 0;
    this._deleted = 0;
    this._capacity = initialCapacity;
    this._hashTable = [];
  }

  static _hashString(string){
    let hash = 5381;
    for (let i = 0; i < string.length; i++){
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
  get(key){
    const index = this._findIndex(key);
    if (this._hashTable[index]===undefined){
      throw new Error('key error')
    }
    return this._hashTable[index].value;
  }
  set(key,value){
    const currentRatio = (this.length + this._deleted + 1) / this._capacity;
    if (currentRatio > HashMap.MAX_LOAD_RATIO){
      this._resize(this._capacity * HashMap.SIZE_RATIO)
    }
    const index = this._findIndex(key);

    if(!this._hashTable[index]){
      this.length++;
    }

    this._hashTable[index] = {
      key,
      value,
      DELETED:false
    }

  }
  _findIndex(key){
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    for (let i = start; i < start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._hashTable[index];
      if (slot === undefined || (slot.key === key && !slot.DELETED)){
        return index;
      }
    }
  }
  _resize(capacity){
    const oldTable = this._hashTable;
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];
    this._capacity = capacity;

    for (const slot of oldTable){
      if (slot && !slot.DELETED){
        this.set(slot.key,slot.value);
      }
    }
  }
}

module.exports = {HashMap}