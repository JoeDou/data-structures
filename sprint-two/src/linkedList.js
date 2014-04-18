var makeLinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;
  var size = 0;

  list.addToTail = function(value){
    if (list.tail === null) {
      list.tail = makeNode(value);
      list.head = list.tail;
    } else {
      var tempNode = makeNode(value);
      tempNode.previous = list.tail;
      list.tail.next = tempNode;
      if (list.head.next === null){
        list.head.next = tempNode;
      }
      list.tail = tempNode;
    }
  };

  list.addToHead = function(value){
    if (list.head === null) {
      list.head = makeNode(value);
      list.tail = list.head;
    } else {
      var tempNode = makeNode(value);
      tempNode.next = list.head;
      list.head.previous = tempNode;
      if (list.tail.previous === null){
        list.tail.previous = tempNode;
      }
      list.head = tempNode;
    }
  };

  list.removeHead = function(){
    var tempNode = list.head.next;
    delete list.head;
    list.head = tempNode;
  };

  list.removeTail = function(){
    var tempNode = list.tail.previous;
    delete list.tail;
    list.tail = tempNode;
  };

  list.contains = function(target, node){
    if (node === undefined) {
      node = list.head;
    } else if (node === null) {
      return false;
    }
    if (node.value === target){
      return true;
    } else{
      return list.contains(target,node.next);
    }
  };

  return list;
};

var makeNode = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};
