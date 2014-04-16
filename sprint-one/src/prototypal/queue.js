var makeQueue = function(){
  var instance = Object.create(queueMethods);
  instance.storage = {};
  instance.index = 0;

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
