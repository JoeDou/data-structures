var makeQueue = function(){
  var instance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var size = 0;

  // Implement the methods below

  instance.enqueue = function(value){
    storage[size] = value;
    size++;
  };

  instance.dequeue = function(){
    size && size--;
    var results = storage[0];
    delete storage[0];
    for (var i=1; i < size+1; i++){
      storage[i-1] = storage[i];
    }
    return results;
  };

  instance.size = function(){
    return size;
  };

  return instance;
};
