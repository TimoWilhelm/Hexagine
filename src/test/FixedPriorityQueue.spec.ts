import { expect } from "chai";
import "mocha";
import { FixedPriorityQueue } from "../lib/FixedPriorityQueue";

describe("FixedPriorityQueue", () => {

  let emptyFixedPriorityQueue: FixedPriorityQueue<string>;
  let filledFixedPriorityQueue: FixedPriorityQueue<string>;

  beforeEach(() => {
    emptyFixedPriorityQueue = new FixedPriorityQueue();

    filledFixedPriorityQueue = new FixedPriorityQueue();
    filledFixedPriorityQueue.enqueue("second", 999);
    filledFixedPriorityQueue.enqueue("first", 1000);
    filledFixedPriorityQueue.enqueue("last", -10);
    filledFixedPriorityQueue.enqueue("third", 0);
  });

  describe("Enqueue", () => {
    it("returns false if the element to enqueue is undefined", () => {
      expect(emptyFixedPriorityQueue.enqueue(undefined, 100)).to.be.false;
      expect(emptyFixedPriorityQueue.isEmpty()).to.be.true;
    });

    it("enqueues an element to the queue", () => {
      expect(emptyFixedPriorityQueue.isEmpty()).to.be.true;
      emptyFixedPriorityQueue.enqueue("element", 999);
      expect(emptyFixedPriorityQueue.isEmpty()).to.be.false;
    });
  });

  describe("Dequeue", () => {
    it("returns undefined if the queue is empty", () => {
      expect(emptyFixedPriorityQueue.dequeue()).to.be.undefined;
    });

    it("dequeues the highest priority item", () => {
      expect(filledFixedPriorityQueue.dequeue()).to.equal("first");
      expect(filledFixedPriorityQueue.dequeue()).to.equal("second");
      expect(filledFixedPriorityQueue.dequeue()).to.equal("third");
      expect(filledFixedPriorityQueue.dequeue()).to.equal("last");
    });
  });

  describe("IsEmpty", () => {
    it("returns true only if the queue is empty", () => {
      expect(emptyFixedPriorityQueue.isEmpty()).to.be.true;
      expect(filledFixedPriorityQueue.isEmpty()).to.be.false;
      filledFixedPriorityQueue.dequeue();
      filledFixedPriorityQueue.dequeue();
      filledFixedPriorityQueue.dequeue();
      expect(filledFixedPriorityQueue.isEmpty()).to.be.false;
      filledFixedPriorityQueue.dequeue();
      expect(filledFixedPriorityQueue.isEmpty()).to.be.true;
    });
  });
});
