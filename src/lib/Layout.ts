import { Hex } from "./Hex";
import { Vec2D } from "./Vec2D";
import { Orientation } from "./Orientation";

/**
 * Class used to convert between hex coordinates and screen coordinates.
 * @export
 * @class Layout
 */
export class Layout {

  /**
   * Creates an instance of Layout.
   * @param {Orientation} orientation The orientation of the hexagonal tiling. The orientation can either be vertical
   *     columns (flat top) or horizontal rows (pointy top).
   * @param {Vec2D} size The size (in pixel) of each hexagon.
   * @param {Vec2D} origin The pixel coordinates of the origin (0,0,0).
   * @memberof Layout
   */
  constructor(public orientation: Orientation, public size: Vec2D, public origin: Vec2D) { }

  /**
   * Converts a hexagon to pixel coordinates.
   * @param {Hex} h The hexagon.
   * @returns {Vec2D} The pixel coordinates of the center of the hexagon.
   * @memberof Layout
   */
  public hexToPixel(h: Hex): Vec2D {
    const M: Orientation = this.orientation;
    const size: Vec2D = this.size;
    const origin: Vec2D = this.origin;
    const x: number = (M.f0 * h.q + M.f1 * h.r) * size.x;
    const y: number = (M.f2 * h.q + M.f3 * h.r) * size.y;
    return new Vec2D(x + origin.x, y + origin.y);
  }

  /**
   * Converts pixel coordinates to a hexagon.
   * @param {Vec2D} p The pixel coordinates.
   * @returns {Hex} The hexagon, centered around the pixel coordinates.
   * @memberof Layout
   */
  public pixelToHex(p: Vec2D): Hex {
    const M: Orientation = this.orientation;
    const size: Vec2D = this.size;
    const origin: Vec2D = this.origin;
    const pt: Vec2D = new Vec2D((p.x - origin.x) / size.x, (p.y - origin.y) / size.y);
    const q: number = M.b0 * pt.x + M.b1 * pt.y;
    const r: number = M.b2 * pt.x + M.b3 * pt.y;
    return new Hex(q, r, -q - r);
  }

  /**
   * Returns the offset of the corner pixel coordinates relative to the origin of a hexagon.
   * @param {number} cornerIndex The index of the corner, starting at 0 on the right corner for vertical layouts
   *     (flat top) or bottom-right corner for horizontal layouts (pointy top) and counting up
   *     counter-clockwise.
   * @returns {Vec2D} The corner offset in pixel coordinates, relative to the origin.
   * @memberof Layout
   */
  public hexCornerOffset(cornerIndex: number): Vec2D {
    const M: Orientation = this.orientation;
    const size: Vec2D = this.size;
    const angle: number = 2.0 * Math.PI * (M.startAngle - cornerIndex) / 6;
    return new Vec2D(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }

  /**
   * Get the pixel coordinates of all six corners of the hexagon.
   * @param {Hex} h The hexagon.
   * @returns {Vec2D[]} An array containing the pixel coordinates of each corner of the hexagon.
   * @memberof Layout
   */
  public polygonCorners(h: Hex): Vec2D[] {
    const corners: Vec2D[] = [];
    const center: Vec2D = this.hexToPixel(h);
    for (let i = 0; i < 6; i++) {
      const offset: Vec2D = this.hexCornerOffset(i);
      corners.push(new Vec2D(center.x + offset.x, center.y + offset.y));
    }
    return corners;
  }
}
