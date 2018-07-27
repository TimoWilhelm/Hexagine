import { makeString } from "typescript-collections/dist/lib/util";

/**
 * Class representing a hexagon.
 * @export
 * @class Hex
 */
export class Hex {

  /**
   * Get the precomputed permutation for a hexagon direction.
   * @static
   * @param {number} directionIndex Index of the edge, starting at 0 on the top-right edge and counting up clockwise.
   * @returns {Hex}
   * @memberof Hex
   */
  public static direction(directionIndex: number): Hex {
    return Hex.directions[directionIndex];
  }

  /**
   * Get the precomputed permutation for a hexagon diagonal.
   * @static
   * @param {number} diagonalIndex Index of the corner, starting at 0 on the right corner for vertical layouts (flat
   *     top) or top-right corner for horizontal layouts (pointy top) and counting up clockwise.
   * @returns {Hex}
   * @memberof Hex
   */
  public static diagonal(diagonalIndex: number): Hex {
    return Hex.diagonals[diagonalIndex];
  }

  /**
   * Array of precomputed permutations for the hexagonal directions, starting at the top-right edge and moving
   * clockwise.
   * @private
   * @static
   * @type {Hex[]}
   * @memberof Hex
   */
  private static directions: Hex[] =
    [
      new Hex(1, 0, -1),
      new Hex(1, -1, 0),
      new Hex(0, -1, 1),
      new Hex(-1, 0, 1),
      new Hex(-1, 1, 0),
      new Hex(0, 1, -1),
    ];

  /**
   * Array of precomputed permutations for the hexagonal diagonals, starting at the right corner for vertical layouts
   * (flat top) or top-right corner for horizontal layouts (pointy top) and counting up clockwise.
   * @private
   * @static
   * @type {Hex[]}
   * @memberof Hex
   */
  private static diagonals: Hex[] =
    [
      new Hex(2, -1, -1),
      new Hex(1, -2, 1),
      new Hex(-1, -1, 2),
      new Hex(-2, 1, 1),
      new Hex(-1, 2, -1),
      new Hex(1, 1, -2),
    ];

  /**
   * The q coordinate
   * @type {number}
   * @memberof Hex
   */
  public readonly q: number = 0;

  /**
   * The r coordinate
   * @type {number}
   * @memberof Hex
   */
  public readonly r: number = 0;

  /**
   * The s coordinate
   * @type {number}
   * @memberof Hex
   */
  public readonly s: number = 0;

  /**
   * Creates a hexagon.
   * @param {number} q The q coordinate
   * @param {number} r The r coordinate
   * @param {number} [s] The s coordinate
   * @memberof Hex
   */
  constructor(q: number, r: number, s?: number) {
    if (s === undefined) {
      s = -q - r as number;
    }
    if (Math.round(q + r + s) !== 0) {
      throw new Error("q + r + s must be 0");
    }
    this.q = q;
    this.r = r;
    this.s = s;
  }
  /**
   * Returns a string that represents the current hexagon.
   * @returns {string} A string that represents the current hexagon.
   * @memberof Hex
   */
  public toString(): string {
    return makeString(this);
  }
  /**
   * Compares two hexagons for equality. Two hexes are equal if their coordinates are equal.
   * @param {Hex} b The hexagon to compare with the current hexagon.
   * @returns {boolean} Returns true if the hexagons are equal; otherwise, false.
   * @memberof Hex
   */
  public equals(b: Hex): boolean {
    return this.q === b.q && this.r === b.r && this.s === b.s;
  }

  /**
   * Adds two hexagons.
   * @param {Hex} b The hexagon to add to the current hexagon.
   * @returns {Hex}
   * @memberof Hex
   */
  public add(b: Hex): Hex {
    return new Hex(this.q + b.q, this.r + b.r, this.s + b.s);
  }

  /**
   * Subtracts two hexagons.
   * @param {Hex} b The hexagon to multiply with this hexagon.
   * @returns {Hex}
   * @memberof Hex
   */
  public subtract(b: Hex): Hex {
    return new Hex(this.q - b.q, this.r - b.r, this.s - b.s);
  }

  /**
   * Calculates the sum of the products of the corresponding vectors. 
   * @param {Hex} b The hexagon to calculate the dot with the current hexagon.
   * @returns {number}
   * @memberof Hex
   */
  public dot(b: Hex): number {
    return (this.q * b.q +this.r +b.r + this.s * b.s);
  }

  /**
   * Scales the hexagon.
   * @param {number} k The scaling factor.
   * @returns {Hex}
   * @memberof Hex
   */
  public scale(k: number): Hex {
    return new Hex(this.q * k, this.r * k, this.s * k);
  }

  /**
   * Rotates the hexagon left around the origin.
   * @returns {Hex}
   * @memberof Hex
   */
  public rotateLeft(): Hex {
    return new Hex(-this.s, -this.q, -this.r);
  }

  /**
   * Rotates the hexagon left around the origin.
   * @returns {Hex}
   * @memberof Hex
   */
  public rotateRight(): Hex {
    return new Hex(-this.r, -this.s, -this.q);
  }

  /**
   * Gets a neighbor of the current hexagon.
   * @param {number} directionIndex Index of the edge touching the neighbor, starting at 0 on the top-right edge and
   *     counting up clockwise.
   * @returns {Hex} The neighbor of the hexagon.
   * @memberof Hex
   */
  public neighbor(directionIndex: number): Hex {
    return this.add(Hex.direction(directionIndex));
  }

  /**
   * Gets all neighbors of the current hexagon.
   * @returns {Hex[]} An array containing all neighbors of the current hexagon.
   * @memberof Hex
   */
  public neighbors(): Hex[] {
    return Hex.directions.map((d) => this.add(d));
  }

  /**
   * Gets a neighbor of the current hexagon.
   * @param {number} diagonalIndex Index of the corner facing the neighbor, starting at 0 on the right corner for
   *     vertical layouts (flat top) or top-right corner for horizontal layouts (pointy top) and counting up
   *     clockwise.
   * @returns {Hex} The neighbor of the hexagon.
   * @memberof Hex
   */
  public diagonalNeighbor(diagonalIndex: number): Hex {
    return this.add(Hex.diagonals[diagonalIndex]);
  }

  /**
   * Gets all diagonal neighbors of the current hexagon.
   * @returns {Hex[]} An array containing all diagonal neighbors of the current hexagon.
   * @memberof Hex
   */
  public diagonalNeighbors(): Hex[] {
    return Hex.diagonals.map((d) => this.add(d));
  }

  /**
   * Calculates the Manhattan distance (sum of the horizontal and vertical distance components) between two hexagons.
   * @param {Hex} b The target hexagon.
   * @returns {number} The Manhattan distance.
   * @memberof Hex
   */
  public manhattanDistance(b: Hex): number {
    return Math.max(Math.abs(this.q - b.q), Math.abs(this.r - b.r), Math.abs(this.s - b.s));
  }

  /**
   * Calculates the straight-line distance between two hexagons.
   * @param {Hex} b The target hexagon.
   * @returns {number} The Euclidean distance.
   * @memberof Hex
   */
  public euclideanDistance(b: Hex): number {
    const diff = this.subtract(b);
    return Math.sqrt(diff.q ** 2 + diff.r ** 2 + diff.s ** 2);
  }

  /**
   * Rounds each component (q,r,s) to the nearest integer with the constraint x + y + z = 0.
   * @returns {Hex} The rounded Hexagon.
   * @memberof Hex
   */
  public round(): Hex {
    let qi: number = Math.round(this.q);
    let ri: number = Math.round(this.r);
    let si: number = Math.round(this.s);
    const qDiff: number = Math.abs(qi - this.q);
    const rDiff: number = Math.abs(ri - this.r);
    const sDiff: number = Math.abs(si - this.s);
    if (qDiff > rDiff && qDiff > sDiff) {
      qi = -ri - si;
    } else if (rDiff > sDiff) {
      ri = -qi - si;
    } else {
      si = -qi - ri;
    }
    return new Hex(qi, ri, si);
  }

  /**
   * Calculates a hexagon between this and another hexagon.
   * @param {Hex} b The end hexagon.
   * @param {number} t The interpolation value between the two floats.
   * @returns {Hex} Thee interpolated hexagon between the two hexagons.
   * @memberof Hex
   */
  public lerp(b: Hex, t: number): Hex {
    return new Hex(this.q * (1 - t) + b.q * t, this.r * (1 - t) + b.r * t, this.s * (1 - t) + b.s * t);
  }

  /**
   * Calculate the hexagons you need to traverse to get from one hexagon to another in a straight line
   * @param {Hex} b The target hexagon.
   * @returns {Hex[]} An array containing all hexagons between the endpoints.
   * @memberof Hex
   */
  public linedraw(b: Hex): Hex[] {
    const N: number = this.manhattanDistance(b);
    const aNudge: Hex = new Hex(this.q + 0.000001, this.r + 0.000001, this.s - 0.000002);
    const bNudge: Hex = new Hex(b.q + 0.000001, b.r + 0.000001, b.s - 0.000002);
    const results: Hex[] = [];
    const step: number = 1.0 / Math.max(N, 1);
    for (let i = 0; i <= N; i++) {
      results.push(aNudge.lerp(bNudge, step * i).round());
    }
    return results;
  }

  /**
   * Get the hexagons that form a ring around this hexagon.
   * @param {number} radius The radius of the ring.
   * @returns {Hex[]} An array containing all hexagons forming the ring.
   * @memberof Hex
   */
  public ring(radius: number): Hex[] {
    if (radius < 0) {
      throw Error("Radius must be positive");
    }
    let hex = this.add(Hex.direction(4).scale(radius));
    const results: Hex[] = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < radius; j++) {
        results.push(hex);
        hex = hex.neighbor(i);
      }
    }
    return results;
  }

  /**
   * Get the hexagons that form a filled ring (larger hexagon) around this hexagon.
   * @param {number} radius The radius of the larger hexagon.
   * @returns An array containing all hexagons inside the larger hexagon.
   * @memberof Hex
   */
  public spiral(radius: number) {
    if (radius < 0) {
      throw Error("Radius must be positive");
    }
    let results = [this] as Hex[];
    for (let k = 1; k <= radius; k++) {
      results = results.concat(this.ring(k));
    }
    return results;
  }

    /**
   * Gets the Euclidean norm or "length" of a vector in a hexagon grid coordinate system from the origin (0,0,0).
   * @returns {number} The Euclidean norm of the vector.
   * @memberof Hex
   */
  public getNorm(): number {
    return this.euclideanDistance(new Hex(0,0,0));
  }

  /**
   * Normalize a vector in a hexagon grid coordinate system. The normalized vector is a vector in the same direction but with norm (length) of 1.
   * @returns {Hex} The unit vector.
   * @memberof Hexagon
   */
  public normalize(): Hex {
    const norm = this.getNorm();
    return new Hex(this.q / norm, this.r / norm, this.s / norm);
  }
}
