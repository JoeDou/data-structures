var HashTable = function(){
  this._limit = 8;
  this._tempLimit = 0;
  this._storage = makeLimitedArray(this._limit);
  this._tempStorage = {};
  this._keys = [];
  this._tempKeys = [];
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  this._keys.push([k,i]);

  var element = this._storage.get(i);
  if ( element === undefined){
    this._storage.set(i,[k,v]);
  }else{
    var arr = [];
    arr.push(element);
    if (Array.isArray(element[1])){
      arr = element;
    }
    arr.push([k,v]);
    this._storage.set(i,arr);
  }

  if (this._keys.length > 0.75*this._limit){
    this._tempStorage = this._storage;
    this._tempLimit = this._limit;
    this._limit = this._limit*2;
    this._storage = makeLimitedArray(this._limit);
    this.transfer();
  }
};

HashTable.prototype.log = function(){
  this._storage.each(function(value){console.log(value);});
};

HashTable.prototype.size = function(){
  var sum = 0;
  this._storage.each(function(value){
    if (value !== undefined){
      sum++;
    }
  });
  return sum;
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(i) === undefined){
    return null;
  }
  var element = this._storage.get(i);
  if (!Array.isArray(element[1])){
    return element[1];
  }else{
    for (var i=0; i<element.length; i++){
      if (element[i][0] === k){
        return element[i][1];
      }
    }
  }
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  this._storage.each(function(item, key, collection){
    if (key === i){
      if (Array.isArray(item[1])){
        for (var j=0; j< item.length; j++){
          if (item[j][0] === k) {
            item.splice(j,1);
          }
        }
      } else {
        collection[key] = undefined;
      }
    }
  });

  this.tempKeys =[];
  for (var m=0; m<this._keys.length; m++){
    if (this._keys[m][0] !== k) {
      this.tempKeys.push(this._keys[m]);
    }
  }
  this._keys = this.tempKeys;

  console.log(this._keys.length);

  if (this._keys.length < 0.25*this._limit){
    this._tempStorage = this._storage;
    this._tempLimit = this._limit;
    this._limit = this._limit/2;
    this._storage = makeLimitedArray(this._limit);
    this.transfer();
  }
};

HashTable.prototype.transfer = function(){
  for (var i =0; i < this._keys.length; i++){
    var key = this._keys[i][0];
    var tempIndex = this._keys[i][1];
    var j = getIndexBelowMaxForKey(key, this._limit);
    this._tempKeys.push([key, j]);
    this._storage.set(j,this._tempStorage.get(tempIndex));
  }
  this._keys = this._tempKeys;
};
