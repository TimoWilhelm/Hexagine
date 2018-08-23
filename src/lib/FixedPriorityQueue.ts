import PriorityQueue from "typescript-collections/dist/lib/PriorityQueue";

/**
 * Class representing a priority queue of elements with a fixed priority.
 * @export
 * @class FixedPriorityQueue
 * @template T
 */
export class FixedPriorityQueue<T> {

  /**
   * The underlying priority queue.
   * @private
   * @memberof FixedPriorityQueue
   */
  private priorityQueue = new PriorityQueue<IElementWithPriority<T>>((a, b) => a.priority - b.priority);

  /**
   * Inserts an element into this priority queue.
   * @param {T} element The element to insert.
   * @param {number} priority The priority of the element.
   * @returns {boolean} True if the element was inserted; otherwise, false.
   * @memberof FixedPriorityQueue
   */
  public enqueue(element: T, priority: number): boolean {
    if (element === undefined || element === null) {
      return false;
    }
    return this.priorityQueue.enqueue({ element, priority });
  }

  /**
   * Retrieves and removes the highest priority element of this queue.
   * @returns {T} The the highest priority element of this queue.
   * @memberof FixedPriorityQueue
   */
  public dequeue(): T | undefined {
    const elementWithPriority = this.priorityQueue.dequeue() as IElementWithPriority<T>;
    if (elementWithPriority === undefined) {
      return undefined;
    }
    return elementWithPriority.element;
  }

  /**
   * Checks if this priority queue is empty.
   * @returns True if this priority queue contains no items; otherwise, false.
   * @memberof FixedPriorityQueue
   */
  public isEmpty() {
    return this.priorityQueue.isEmpty();
  }
}

/**
 * Interface for an element with a fixed priority.
 * @interface IElementWithPriority
 * @template T
 */
interface IElementWithPriority<T> {
  /**
   * The element value.
   * @type {T}
   * @memberof IElementWithPriority
   */
  readonly element: T;
  /**
   * The element priority.
   * @type {number}
   * @memberof IElementWithPriority
   */
  readonly priority: number;
}
