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
binaryTreeMethods.depthFirstLog = function (){

};
