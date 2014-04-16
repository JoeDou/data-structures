var _ = {};

_.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var j in arguments[i]){
        obj[j] = arguments[i][j];
      }
    }
    return obj;
  };

var makeStack = function() {
  var instance = {
    storage: {},
    index: 0,
  };

  // Use an object with numeric keys to store values
  // var storage = {};
  // var size = 0; // Hint: set an initial value here

  // Implement the methods below

  _.extend(instance,stackMethods);

  return instance;
};

var stackMethods = {
  push: function(value){
    this.storage[this.index] = value;
    this.index++;
  },
  pop: function(){
    this.index && this.index--;
    var result = this.storage[this.index];
    delete this.storage[this.index];
    return result;
  },
  size: function(){
    return this.index;
  }
};

// var stack = makeStack();
// stack.pop('a');

// var stack2 = makeStack();
// function() {
// this.length
// }
// stack.function()
