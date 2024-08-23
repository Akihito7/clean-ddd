import { WatchedList } from "./watched-list";

class NumberWatchedList<T> extends WatchedList<T> {
  compareItems(a: T, b: T): boolean {
    return a === b;
  }
}

let numbers: NumberWatchedList<Number>
describe("watched list tests", () => {

  beforeEach(() => {
    numbers = new NumberWatchedList([1, 2, 3])
  });

  it("should be able add new item in watchedlist", () => {
    numbers.add(21);
    expect(numbers.getNewItems()).toEqual([21]);
    expect(numbers.currentItems).toHaveLength(4)
  })

  it("should be able remove item in watchedlist", () => {
    numbers.remove(1);
    expect(numbers.getRemovedItems()).toEqual([1]);
    expect(numbers.currentItems).toHaveLength(2)
  })

  it("should be able to add an item even if it was removed before", () => {
    numbers.remove(1);
    numbers.add(1)
    expect(numbers.getRemovedItems()).toEqual([]);
    expect(numbers.getNewItems()).toEqual([])
    expect(numbers.currentItems).toHaveLength(3)
  })

  it('should be able to remove an item even if it was added before', () => {
    numbers.add(4)
    numbers.remove(4)
    expect(numbers.currentItems).toHaveLength(3)
    expect(numbers.getNewItems()).toEqual([])
    expect(numbers.getRemovedItems()).toEqual([])
  })

  it('should be able to update watched list items', () => {
    numbers.update([1, 3, 5])
    expect(numbers.getRemovedItems()).toEqual([2])
    expect(numbers.getNewItems()).toEqual([5])
  })

})