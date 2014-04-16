var Stack = function() {
  this.storage = {};
  this.index = 0;
};

Stack.prototype = {
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

var stack = new Stack();
