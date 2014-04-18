var makeBinarySearchTree = function(value){
  var instance = {};
  instance.value = value;
  instance.left = null;
  instance.right = null;

  _.extend(instance,binaryTreeMethods);

  return instance;
};

var binaryTreeMethods = {};

binaryTreeMethods.insert = function(value){
  if (this.value < value){
    if (this.right === null) {
      this.right = makeBinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  } else if (this.value > value) {
    if (this.left === null) {
      this.left = makeBinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  }
};
binaryTreeMethods.contains = function (value){
  var result = false;

  if (this.value === value){
    result = true;
  }

  if (this.left !== null) {
    result = result || this.left.contains(value);
  }

  if (this.right !== null){
    result = result || this.right.contains(value);
  }

  return result;

};
binaryTreeMethods.depthFirstLog = function (callback){
  callback(this.value);

  if(this.left !== null){
    this.left.depthFirstLog(callback);
  }

  if(this.right !== null){
    this.right.depthFirstLog(callback);
  }

};
binaryTreeMethods.breadthFirstLog = function (callback){
  var queue = [this];

  var callbackQueue = function(array){
    var newQueue = [];

    for (var i=0; i<array.length; i++){
      callback(array[i].value);
      array[i].left && newQueue.push(array[i].left);
      array[i].right && newQueue.push(array[i].right);
    }
    if (newQueue.length > 0){
      callbackQueue(newQueue);
    }

  };

  callbackQueue(queue);
};

binaryTreeMethods.minDepth = function (){
  var total = 0;
  var depth = 1;
  var sum = function(){
    total++;
  };
  this.depthFirstLog(sum);

  while(Math.pow(2,depth) < total){
    depth++;
  }

  return depth;
};

binaryTreeMethods.maxDepth = function (){

  var findDepth = function(node){
    var rightValue = 0;
    var leftValue = 0;
    if (node.right !== null){
      rightValue = findDepth(node.right);
    }
    if (node.left !== null){
      leftValue = findDepth(node.left);
    }

    return(Math.max(rightValue, leftValue)+1);
  };

  return findDepth(this);
};
