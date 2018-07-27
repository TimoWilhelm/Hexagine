import { Dictionary, Set } from "typescript-collections";
import { Hex } from "../Core/Hex";
import { FixedPriorityQueue } from "./FixedPriorityQueue";
import { IPathFindingResult } from "./IPathFindingResult";

/**
 * Class representing a hex map.
 * @export
 * @class HexMap
 */
export class HexMap {

  /**
   * Converts a JavaScript Object Notation (JSON) array of hexagon objects into a hex map.
   * @static
   * @param {string} json A valid JSON array of hexagons.
   * @returns {HexMap} A hex map.
   * @memberof HexMap
   */
  public static fromJSON(json: string): HexMap {
    const hexArr = (JSON.parse(json) as Hex[]).map((h) => new Hex(h.q, h.r, h.s));
    return new HexMap(hexArr);
  }

  /**
   * The underlying set containing the elements of the hex map.
   * @private
   * @type {Set<Hex>}
   * @memberof HexMap
   */
  private elements: Set<Hex> = new Set<Hex>();

  /**
   * Creates an instance of a hex map.
   * @param {Hex[]} [hexArr] Optional array of hexagons to add to this hex map.
   * @memberof HexMap
   */
  constructor(hexArr?: Hex[]) {
    if (hexArr !== undefined) {
      hexArr.forEach((h) => this.elements.add(h));
    }
  }

  /**
   * Get all hexagons contained in this hex map.
   * @returns {Hex[]} An array containing all hexagons in this hex map.
   * @memberof HexMap
   */
  public getElements(): Hex[] {
    return this.elements.toArray();
  }

  /**
   * Adds the hexagon to this hex map if it is not already present.
   * @param {Hex} hex The hexagon to insert.
   * @returns True if this hex map did not already contain the specified element; otherwise, false.
   * @memberof HexMap
   */
  public add(hex: Hex): boolean {
    return this.elements.add(hex);
  }

  /**
   * Removes the hexagon from this hex map if it is present.
   * @param {Hex} hex The hexagon to remove.
   * @returns {boolean} True if this hex map contains the specified element; otherwise, false.
   * @memberof HexMap
   */
  public remove(hex: Hex): boolean {
    return this.elements.remove(hex);
  }

  /**
   * Checks if the hexagon exists in this hex map.
   * @param {Hex} hex The hexagon to search for.
   * @returns {boolean} True if this hex map contains the hexagon; otherwise, false.
   * @memberof HexMap
   */
  public contains(hex: Hex): boolean {
    return this.elements.contains(hex);
  }

  /**
   * Tries to find the shortest path between two hexagons using the
   * {@link https://wikipedia.org/wiki/A*_search_algorithm | A* search algorithm}.
   * @param {Hex} start The starting hex.
   * @param {Hex} goal The target hex.
   * @returns {IPathFindingResult} The result of the path search.
   * @memberof HexMap
   */
  public findPath(start: Hex, goal: Hex): IPathFindingResult {
    if (!this.contains(start)) {
      throw new Error("The starting point must be an element of the hex map");
    } else if (!this.contains(goal)) {
      throw new Error("The goal must be an element of the hex map");
    }

    const DISTANCE_TO_NEIGHBOR = 1;

    const frontier = new FixedPriorityQueue<Hex>();
    frontier.enqueue(start, 0);
    const cameFrom = new Dictionary<Hex, Hex | undefined>();
    const costSoFar = new Dictionary<Hex, number>();
    cameFrom.setValue(start, undefined);
    costSoFar.setValue(start, 0);

    while (!frontier.isEmpty()) {
      const current = frontier.dequeue() as Hex;
      if (current.equals(goal)) {
        break;
      }

      const neighbors = this.getValidNeighbors(current);
      for (const next of neighbors) {
        const newCost = (costSoFar.getValue(current) as number) + DISTANCE_TO_NEIGHBOR;
        if (!costSoFar.containsKey(next) || newCost < (costSoFar.getValue(next) as number)) {
          costSoFar.setValue(next, newCost);
          const priority = -(newCost + this.heuristic(next, goal));
          frontier.enqueue(next, priority);
          cameFrom.setValue(next, current);
        }
      }
    }

    const finalPath: Hex[] = [];
    let element = goal;
    while (!element.equals(start)) {
      finalPath.push(element);
      element = cameFrom.getValue(element) as Hex;
      if (element === undefined) {
        return {
          cameFrom,
          costSoFar,
          hasPath: false,
        };
      }
    }
    finalPath.push(start);
    return {
      cameFrom,
      costSoFar,
      hasPath: true,
      path: finalPath.reverse(),
    };
  }

  /**
   * Converts this hex map value to a JavaScript Object Notation (JSON) array of the elements.
   * @returns {string} A JSON array containing the elements of the hex map.
   * @memberof HexMap
   */
  public toJSON(): string {
    return JSON.stringify(this.elements.toArray());
  }

  /**
   * Get all neighbors of a hexagon, which are included in this hex map.
   * @private
   * @param {Hex} hex The hexagon to search for.
   * @returns {Hex[]} An array containing all valid neighbors of the hexagon.
   * @memberof HexMap
   */
  private getValidNeighbors(hex: Hex): Hex[] {
    return hex.neighbors().filter((n) => this.elements.contains(n));
  }

  /**
   * The heuristic function used by the A* search algorithm that estimates the cost of the cheapest path from one
   * hexagon to another.
   * @private
   * @param {Hex} a The starting hexagon.
   * @param {Hex} b The target hexagon.
   * @returns {number} The estimated cost of the cheapest path.
   * @memberof HexMap
   */
  private heuristic(a: Hex, b: Hex): number {
    const diff = a.subtract(b);
    return a.manhattanDistance(b) + (diff.q ** 2 + diff.r ** 2 + diff.s ** 2) * .001;
  }
}
