var Graph = function(){
  this.nodeList = {};
};

Graph.prototype.addNode = function(newNode, toNode){
  this.nodeList[newNode] = mkNode(newNode);
  var keys = Object.keys(this.nodeList);
  if (keys.length === 2){
    this.addEdge(keys[0],newNode);
  }
  if (toNode !== undefined) {
    this.addEdge(newNode, toNode);
  }
};

Graph.prototype.contains = function(node){
  if (this.nodeList[node] !== undefined) {
    return true;
  }
  return false;
};

Graph.prototype.removeNode = function(node){
  delete this.nodeList[node];
};

Graph.prototype.getEdge = function(fromNode, toNode){
  var index = this.nodeList[fromNode].edges.indexOf(toNode);
  if(index !== -1) {
    return true;
  }
  return false;
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.nodeList[fromNode].edges.push(toNode);
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  var index = this.nodeList[fromNode].edges.indexOf(toNode);
  if(index !== -1){
    this.nodeList[fromNode].edges.splice(index,1);
  }
  if (Object.keys(this.nodeList).length < 3){
    if ((!this.nodeList[fromNode].edges.length) && (!this.nodeList[toNode].edges.length)){
      this.removeNode(fromNode);
      this.removeNode(toNode);
    }
  }

};

var mkNode = function(value){
  var node = {};
  // node.value = value;
  node.edges = [];

  return node;
};
