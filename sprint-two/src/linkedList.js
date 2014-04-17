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
      // list.tail.next = list.tail.value;
      var tempNode = makeNode(value);
      list.tail.next = tempNode;
      if (list.head.next === null){
        list.head.next = tempNode;
      }
      list.tail = tempNode;
    }
  };

  list.removeHead = function(){
    var tempNode = list.head.next;
    delete list.head;
    list.head = tempNode;
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

  return node;
};
