var makeStack = function() {
  var instance = Object.create(stackMethods);
  instance.storage =  {};
  instance.index = 0;

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
