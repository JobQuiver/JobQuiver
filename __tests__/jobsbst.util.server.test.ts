import JobBST from '../server/util/JobBST'

describe('JobBST tests', () => {
  let bst:JobBST<any>;

  beforeEach(() => {
    bst = new JobBST<any>();
  })

  it('Can create empty list', () => {
    expect(bst.root).toBeNull();
    expect(bst.inOrder()).toEqual([]);
  });

  it('Can create a BST with one node', () => {
    bst.add(0, 'test');
    expect(bst.root.score).toBe(0);
    expect(bst.root.list).toHaveLength(1);
  });

  it('Can create a BST with repeated scores', () => {
    for(let i = 0; i < 5; i++) bst.add(0, 'test');
    expect(bst.root.score).toBe(0);
    expect(bst.root.list).toHaveLength(5);
    expect(bst.root.left).toBeNull();
    expect(bst.root.right).toBeNull();
    expect(bst.inOrder()).toEqual(['test', 'test', 'test', 'test', 'test', ])
  });

  it('Can create a BST with different scores', () => {
    bst.add(5, '2');
    bst.add(2, '1');
    bst.add(7, '4');
    bst.add(6, '3');

    expect(bst.root.score).toBe(5);
    expect(bst.root.list).toHaveLength(1);
    expect(bst.root.left.score).toBe(2);
    expect(bst.root.left.list).toHaveLength(1);
    expect(bst.root.right.score).toBe(7);
    expect(bst.root.right.list).toHaveLength(1);
    expect(bst.root.right.left.score).toBe(6);
    expect(bst.root.right.left.list).toHaveLength(1);
    expect(bst.inOrder()).toEqual(['4','3','2','1']);
  });

  it('Can handle a random string of data', () => {
    const data = [];
    for(let i = 0; i < 20; i++) {
      const item = Math.round(Math.random() * 10);
      data.push(item);
      bst.add(item, item);
    }

    expect(bst.inOrder()).toEqual(data.sort((a, b) => b - a));
  });
});