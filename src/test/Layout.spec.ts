import { expect } from "chai";
import "mocha";
import { Layout, Hex, Orientation, Vec2D } from "../lib";
import "./TestHelper";

describe("Layout", () => {

  const flatLayout: Layout = new Layout(Orientation.FLAT, new Vec2D(10, 15), new Vec2D(35, 71));

  describe("HexToPixel", () => {
    it("converts a hexagon to a 2D pixel position in a given layout", () => {
      const hex = new Hex(1, 2, -3);
      const expectedResult = new Vec2D(50, 135.952);
      expect(flatLayout.hexToPixel(hex)).to.be.closeToVec2D(expectedResult);
    });
  });

  describe("PixelToHex", () => {
    it("converts a 2D pixel position to a hexagon in a given layout", () => {
      const pixel = new Vec2D(50, 100);
      const expectedResult = new Hex(1, 0.616, -1.616);
      expect(flatLayout.pixelToHex(pixel)).to.be.closeToHex(expectedResult);
    });
  });

  describe("hexCornerOffset", () => {
    it("returns the pixel offset of a hexagon corner from its center in a given layout", () => {
      const expectedResult = new Vec2D(-5, -12.990);
      expect(flatLayout.hexCornerOffset(2)).to.be.closeToVec2D(expectedResult);
    });
  });

  describe("polygonCorners", () => {
    it("returns the 2D pixel positions of all hexagon corners", () => {
      const hex = new Hex(1, 2, -3);
      const expectedResult = [
        new Vec2D(60, 135.952),
        new Vec2D(55, 122.962),
        new Vec2D(45, 122.962),
        new Vec2D(40, 135.952),
        new Vec2D(45, 148.942),
        new Vec2D(55, 148.942),
      ];
      const actualResult = flatLayout.polygonCorners(hex);
      for (let i = 0; i < actualResult.length; i++) {
        expect(actualResult[i]).to.be.closeToVec2D(expectedResult[i])
      }
    });
  });
});
