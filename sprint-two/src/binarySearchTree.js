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

  if (this.depth(Math.max) > 2*this.depth(Math.min)){
    this.rebalance();
    console.log("rebalance tree: " + value);
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
  this.breadthTraverse(function(node){
    callback(node.value);
  });
};

binaryTreeMethods.breadthTraverse = function (callback){
  var queue = [this];

  var callbackQueue = function(array){
    var newQueue = [];

    for (var i=0; i<array.length; i++){
      callback(array[i]);
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
  // var total = 0;
  // var depth = 1;
  // var sum = function(){
  //   total++;
  // };
  // this.depthFirstLog(sum);

  // while(Math.pow(2,depth) < total){
  //   depth++;
  // }

  // return depth;
};

binaryTreeMethods.depth = function (func){

  var findDepth = function(node){
    var rightValue = 0;
    var leftValue = 0;
    if (node.right !== null){
      rightValue = findDepth(node.right);
    }
    if (node.left !== null){
      leftValue = findDepth(node.left);
    }

    return(func.call(null,rightValue, leftValue)+1);
  };

  // binaryTreeMethods.depth(Math.min)

  return findDepth(this);
};

binaryTreeMethods.rebalance = function (){
  var nodesValue =[];
  var indexArray = [];
  this.depthFirstLog(function(value){
    nodesValue.push(value);
  });
  nodesValue.sort(function(a,b){return a-b;});

  var sortArray = function(){
    var queueArray = [];

    for (var i=0; i<arguments.length;i++){
      var index = Math.floor(arguments[i].length / 2) ;
      indexArray.push(arguments[i][index]);
      if (arguments[i].length > 1) {
        var leftArray = arguments[i].slice(0,index);
        queueArray.push(leftArray);
        if (arguments[i].length > 2) {
          var rightArray = arguments[i].slice(index+1);
          queueArray.push(rightArray);
        }
      }
    }

    if(nodesValue.length !== indexArray.length){
      sortArray.apply(null,queueArray);
    }
  };

  sortArray(nodesValue);

  console.log(indexArray);

  var nodes = [];

  this.breadthTraverse(function(node){
    nodes.push(node);
  });

  for (var i=0; i< indexArray.length; i++) {
    nodes[i].value = indexArray[i];
    nodes[i].left = null;
    nodes[i].right = null;
  }

  for (var i=1; i<nodes.length; i++){
    this.insertNode(nodes[i]);
  }

};

binaryTreeMethods.insertNode = function(node){
  if (this.value < node.value){
    if (this.right === null) {
      this.right = node;
    } else {
      this.right.insertNode(node);
    }
  } else if (this.value > node.value) {
    if (this.left === null) {
      this.left = node;
    } else {
      this.left.insertNode(node);
    }
  }
};
