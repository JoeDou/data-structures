var _ = {};

_.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var j in arguments[i]){
        obj[j] = arguments[i][j];
      }
    }
    return obj;
  };

var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.children = undefined;
  _.extend(newTree,treeMethods);
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  if (this.children === undefined) {
    this.children = [];
  }
  this.children.push(makeTree(value));
};

treeMethods.contains = function(target){
  if (this.children === undefined) {
    if (target === this.value) {
      return true;
    }
  } else {
    for (var i=0; i<this.children.length; i++){
      if(this.children[i].contains(target)){
        return true;
      }
    }
  }
  return false
};

/// var tree = makeTree(10);
// tree.addChild(5)
