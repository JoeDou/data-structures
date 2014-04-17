var makeSet = function(){
  var set = Object.create(setPrototype);
  set._storage = undefined;
  return set;
};

var setPrototype = {};

setPrototype.add = function(item){
  if (this._storage === undefined){
    this._storage = {};
  }
  this._storage[item] = true;
};

setPrototype.contains = function(item){
  if(this._storage[item]){
    return true;
  }
  return false;
};

setPrototype.remove = function(item){
  if (this._storage[item]){
    delete this._storage[item];
  }
};

// set1 = makeSet()
// set2 = makeSet()
