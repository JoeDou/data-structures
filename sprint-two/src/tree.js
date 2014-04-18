var makeTree = function(value){
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  newTree.children = undefined;
  _.extend(newTree,treeMethods);
  return newTree;
};


var treeMethods = {};

treeMethods.addChild = function(value){
  if (this.children === undefined) {
    this.children = [];
  }
  var tree = makeTree(value);
  tree.parent = this;
  this.children.push(tree);
};

treeMethods.contains = function(target){
  if (target === this.value) {
    return true;
  }

  if (this.children !== undefined) {
    for (var i=0; i<this.children.length; i++){
      if(this.children[i].contains(target)){
        return true;
      }
    }
  }
  return false;
};

treeMethods.removeFromParents = function(target){
  if (target === this.value){
    var tempParent = this.parent;
    this.parent = null;
    for (var i=0; i < tempParent.children.length; i++){
      if(tempParent.children[i].value === target){
        tempParent.children.splice(i,1);
      }
    }
  }
  if (this.children !== undefined){
    for (var i=0; i <this.children.length; i++){
      this.children[i].removeFromParents(target);
    }
  }
};

treeMethods.traverse = function(callback){
  callback(this.value);

  if (this.children !== undefined) {
    for (var i=0; i<this.children.length; i++){
      this.children[i].traverse(callback);
    }
  }
};
