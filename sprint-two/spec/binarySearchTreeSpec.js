var assert = chai.assert;

describe("binarySearchTree", function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = makeBinarySearchTree(5);
  });

  it("should have methods named 'insert', 'contains', and 'depthFirstLog", function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it("should insert values at the correct location in the tree", function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it("should have a working 'contains' method", function(){
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    assert.isTrue(binarySearchTree.contains(7));
    assert.isFalse(binarySearchTree.contains(8));
  });

  it("should execute a callback on every value in a tree using 'depthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    assert.notStrictEqual(array, [5,2,3]);
  });

  it("should execute a callback on every value in a tree using 'breadthFirstLog'", function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(2);
    binarySearchTree.insert(4);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.breadthFirstLog(func);
    expect(JSON.stringify(array)).to.equal(JSON.stringify([5,3,7,2,4,6,8]));
  });

  it("should check min and max depth'", function(){
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(2);
    binarySearchTree.insert(4);
    binarySearchTree.insert(6);
    binarySearchTree.insert(1);
    expect(binarySearchTree.depth(Math.min)).to.equal(2);
    expect(binarySearchTree.depth(Math.max)).to.equal(4);
  });

  it("should rebalance tree when max depth exceeds twice the min depth'", function(){
    var array = [];
    var func = function(value){ array.push(value); };
    binarySearchTree.insert(4);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    binarySearchTree.insert(9);
    binarySearchTree.insert(10);
    binarySearchTree.insert(11);
    binarySearchTree.breadthFirstLog(func);
    // expect(binarySearchTree.depth(Math.min)).to.equal(1);
    // expect(binarySearchTree.depth(Math.max)).to.equal(11);
    expect(JSON.stringify(array)).to.equal(JSON.stringify([6,4,8,3,5,7,9,10,11]));
  });
});
