/**
 * Class representing a 2D vector.
 * @export
 * @class Vec2D
 */
export class Vec2D {
  /**
   * Creates an instance of Vec2D.
   * @param {number} x
   * @param {number} y
   * @memberof Vec2D
   */
  constructor(public readonly x: number, public readonly y: number) { }

  /**
   * Returns a string that represents the current hexagon.
   * @returns {string} A string that represents the current hexagon.
   * @memberof Vec2D
   */
  public toString(): string {
    return JSON.stringify(this);
  }

  /**
   * Compares two vectors for equality. Two vectors are equal if their coordinates are equal.
   * @param {Vec2D} b The vector to compare with the current hexagon.
   * @returns {boolean} Returns true if the vectors are equal; otherwise, false.
   * @memberof Vec2D
   */
  public equals(b: Vec2D): boolean {
    return this.x === b.x && this.y === b.y;
  }

  /**
   * Adds two vectors.
   * @param {Vec2D} b The vector to add to the current hexagon.
   * @returns {Vec2D}
   * @memberof Vec2D
   */
  public add(b: Vec2D): Vec2D {
    return new Vec2D(this.x + b.x, this.y + b.y);
  }

  /**
   * Subtracts two vectors.
   * @param {Vec2D} b The vector to subtract from the current vector.
   * @returns {Vec2D}
   * @memberof Vec2D
   */
  public subtract(b: Vec2D): Vec2D {
    return new Vec2D(this.x - b.x, this.y - b.y);
  }

  /**
   * Scales the vector.
   * @param {number} k The scaling factor.
   * @returns {Vec2D}
   * @memberof Vec2D
   */
  public scale(k: number): Vec2D {
    return new Vec2D(this.x * k, this.y * k);
  }

  /**
   * Gets the Euclidean norm or "length" of the vector from the origin (0,0).
   * @returns {number} The Euclidean norm of the vector.
   * @memberof Vec2D
   */
  public getNorm(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * Normalize a vector. The normalized vector is a vector in the same direction but with norm (length) of 1.
   * @returns {Vec2D} The unit vector.
   * @memberof Vec2D
   */
  public normalize(): Vec2D {
    const norm = this.getNorm();
    return new Vec2D(this.x / norm, this.y / norm);
  }
}
