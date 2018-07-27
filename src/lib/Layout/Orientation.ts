/**
 * Helper class to store the orientation matrices.
 * @export
 * @class Orientation
 */
export class Orientation {

  /**
   * The pointy top or horizontal row layout, starting at 30°.
   * @static
   * @type {Orientation}
   * @memberof Orientation
   */
  public static POINTY: Orientation = new Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5);

  /**
   * The flat top or vertical column layout, starting at 0°.
   * @static
   * @type {Orientation}
   * @memberof Orientation
   */
  public static FLAT: Orientation = new Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0);

  /**
   * Creates an instance of the Orientation helper class, consisting of a 2×2 forward matrix, a 2×2 inverse matrix,
   * and the starting angle.
   * @param {number} f0 First element of the conversion matrix.
   * @param {number} f1 Second element of the conversion matrix.
   * @param {number} f2 Third element of the conversion matrix.
   * @param {number} f3 Fourth element of the conversion matrix.
   * @param {number} b0 First element of the inverse conversion matrix.
   * @param {number} b1 Second element of the inverse conversion matrix.
   * @param {number} b2 Third element of the inverse conversion matrix.
   * @param {number} b3 Fourth element of the inverse conversion matrix.
   * @param {number} startAngle Start angle in multiples of 60°.
   * @private
   * @memberof Orientation
   */
  private constructor(
    public f0: number,
    public f1: number,
    public f2: number,
    public f3: number,
    public b0: number,
    public b1: number,
    public b2: number,
    public b3: number,
    public startAngle: number,
  ) { }
}
