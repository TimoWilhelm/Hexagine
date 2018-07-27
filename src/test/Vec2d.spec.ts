import { expect } from "chai";
import { Vec2D } from "../lib";
import "mocha";
import "./TestHelper";

describe("Vec2D", () => {

  describe("Equals", () => {

    it("is true if their coordinates are equal", () => {
      const vecA = new Vec2D(1, 2.345);
      const vecB = new Vec2D(1, 2.345);
      expect(vecA.equals(vecB)).to.be.true;
    });

    it("is false if their coordinates are different", () => {
      const vecA = new Vec2D(1, 2.345);
      const vecB = new Vec2D(-3, 0);
      expect(vecA.equals(vecB)).to.be.false;
    });
  });

  describe("Add", () => {
    it("correctly adds two vectors", () => {
      const vecA = new Vec2D(1, 2);
      const vecB = new Vec2D(-3, 1);
      const expectedResult = new Vec2D(-2, 3);
      expect(vecA.add(vecB)).to.deep.equal(expectedResult);
    });
  });

  describe("Subtract", () => {
    it("correctly subtracts two vectors", () => {
      const vecA = new Vec2D(1, 2);
      const vecB = new Vec2D(-3, 1);
      const expectedResult = new Vec2D(4, 1);
      expect(vecA.subtract(vecB)).to.deep.equal(expectedResult);
    });
  });

  describe("Scale", () => {
    it("correctly scales a vector", () => {
      const vecA = new Vec2D(-3, 2);
      const expectedResult = new Vec2D(-9, 6);
      expect(vecA.scale(3)).to.deep.equal(expectedResult);
    });
  });

  describe("Norm", () => {
    it("returns the Euclidean norm of the vector from the origin (0,0)", () => {
      const vecA = new Vec2D(-3, 2);
      expect(vecA.getNorm()).to.be.closeTo(3.605, 0.001);
    });
  });

  describe("Normalize", () => {
    it("returns the normalized vector with a length of 1", () => {
      const vecA = new Vec2D(-3, 2);
      const expectedResult = new Vec2D(-0.832, 0.555)
      const normalizedVector = vecA.normalize();
      expect(normalizedVector.getNorm()).to.equal(1);
      expect(normalizedVector).to.be.closeToVec2D(expectedResult)
    });
  });

  describe("ToString", () => {
    it("returns a string with the coordinates of the vector", () => {
      const vecA = new Vec2D(-3, 2);
      const expectedResult = "{x:-3,y:2}";
      expect(vecA.toString()).to.equal(expectedResult);
    });
  });
});
