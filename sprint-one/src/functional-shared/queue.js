var _ = {};

_.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var j in arguments[i]){
        obj[j] = arguments[i][j];
      }
    }
    return obj;
  };

var makeQueue = function(){
  var instance = {
    storage: {},
    index: 0,
  };

  // Use an object with numeric keys to store values

  // Implement the methods below

  _.extend(instance,queueMethods);

  return instance;
};

var queueMethods = {
  enqueue: function(value){
    this.storage[this.index] = value;
    this.index++;
  },
  dequeue: function(){
    this.index && this.index--;
    var results = this.storage[0];
    delete this.storage[0];
    for (var i=1; i < this.index+1; i++){
      this.storage[i-1] = this.storage[i];
    }
    return results;
  },
  size: function(){
    return this.index;
  }
};
