import Dictionary from "typescript-collections/dist/lib/Dictionary";
import { Hex } from "./Hex";

/**
 * Interface for the result of a pathfinding algorithm.
 * @export
 * @interface IPathFindingResult
 */
export interface IPathFindingResult {

  /**
   * A dictionary containing the previous hexagon for each hexagon visited by the pathfinding algorithm.
   * @type {(Dictionary<Hex, Hex | undefined>)}
   * @memberof IPathFindingResult
   */
  cameFrom?: Dictionary<Hex, Hex | undefined>;

  /**
   * A dictionary containing the number of steps required to get to each hexagon visited by the pathfinding algorithm.
   * @type {Dictionary<Hex, number>}
   * @memberof IPathFindingResult
   */
  costSoFar?: Dictionary<Hex, number>;

  /**
   * True if a the algorithm has found a continuous path from the start to the goal.
   * @type {boolean}
   * @memberof IPathFindingResult
   */
  hasPath: boolean;

  /**
   * An array containing the hexagons forming a path from the starting point to the goal, including start and goal.
   * @type {Hex[]}
   * @memberof IPathFindingResult
   */
  path?: Hex[];
}
