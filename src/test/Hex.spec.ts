import { expect } from "chai";
import "mocha";
import { Hex } from "../lib";

describe("Hex", () => {

  describe("Constructor", () => {
    it("throws an error if parameters are invalid", () => {
      const createHex = () => { new Hex(1, 2, 3) };
      expect(createHex).to.throw(Error, "q + r + s must be 0");
    });

    it("calculates the optional s value", () => {
      const createHex = new Hex(1, 2);
      const expectedResult = new Hex(1, 2, -3);
      expect(createHex).to.deep.equal(expectedResult)
    });
  });

  describe("Equals", () => {

    it("is true if their coordinates are equal", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(1, 1, -2);
      expect(hexA.equals(hexB)).to.be.true;
    });

    it("is false if their coordinates are different", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(-3, 3, 0);
      expect(hexA.equals(hexB)).to.be.false;
    });
  });

  describe("Add", () => {
    it("correctly adds two hexagons", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(-3, 3, 0);
      const expectedResult = new Hex(-2, 4, -2);
      expect(hexA.add(hexB)).to.deep.equal(expectedResult);
    });
  });

  describe("Subtract", () => {
    it("correctly subtracts two hexagons", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(-3, 3, 0);
      const expectedResult = new Hex(4, -2, -2);
      expect(hexA.subtract(hexB)).to.deep.equal(expectedResult);
    });
  });

  describe("Scale", () => {
    it("correctly scales a hexagon", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = new Hex(3, 6, -9);
      expect(hexA.scale(3)).to.deep.equal(expectedResult);
    });
  });

  describe("RotateLeft", () => {
    it("correctly rotates a hexagon left", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = new Hex(3, -1, -2);
      expect(hexA.rotateLeft()).to.deep.equal(expectedResult);
    });
  });

  describe("RotateRight", () => {
    it("correctly rotates a hexagon right", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = new Hex(-2, 3, -1);
      expect(hexA.rotateRight()).to.deep.equal(expectedResult);
    });
  });

  describe("Direction", () => {
    it("correctly returns the permutation in the specified direction", () => {
      const expectedResult = new Hex(0, -1, 1);
      expect(Hex.direction(2)).to.deep.equal(expectedResult);
    });
  });

  describe("Diagonal", () => {
    it("correctly returns the permutation in the specified direction", () => {
      const expectedResult = new Hex(-1, -1, 2);
      expect(Hex.diagonal(2)).to.deep.equal(expectedResult);
    });
  });

  describe("Neighbor", () => {
    it("correctly returns the neighbor of a hexagon in the specified direction", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = new Hex(1, 1, -2);
      expect(hexA.neighbor(2)).to.deep.equal(expectedResult);
    });
  });

  describe("Neighbors", () => {
    it("correctly returns all neighbors of a hexagon", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = [
        new Hex(2, 2, -4),
        new Hex(2, 1, -3),
        new Hex(1, 1, -2),
        new Hex(0, 2, -2),
        new Hex(0, 3, -3),
        new Hex(1, 3, -4),
      ]
      expect(hexA.neighbors()).to.be.deep.members(expectedResult);
    });
  });

  describe("DiagonalNeighbor", () => {
    it("correctly returns the diagonal neighbor of a hexagon in the specified direction", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = new Hex(0, 1, -1);
      expect(hexA.diagonalNeighbor(2)).to.deep.equal(expectedResult);
    });
  });

  describe("DiagonalNeighbors", () => {
    it("correctly returns all diagonal neighbors of a hexagon", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = [
        new Hex(3, 1, -4),
        new Hex(2, 0, -2),
        new Hex(0, 1, -1),
        new Hex(-1, 3, -2),
        new Hex(0, 4, -4),
        new Hex(2, 3, -5),
      ]
      expect(hexA.diagonalNeighbors()).to.be.deep.members(expectedResult);
    });
  });

  describe("ManhattanDistance", () => {
    it("correctly returns the sum of the horizontal and vertical distance components", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(-3, 3, 0);
      expect(hexA.manhattanDistance(hexB)).to.equal(4);
    });
  });

  describe("EuclideanDistance", () => {
    it("correctly returns the diagonal distance", () => {
      const hexA = new Hex(1, 1, -2);
      const hexB = new Hex(-3, 3, 0);
      expect(hexA.euclideanDistance(hexB)).to.be.closeTo(4.899, 0.001);
    });
  });

  describe("Round", () => {
    it("rounds a hexagon correctly", () => {
      const hexA = new Hex(0.7, 0.9, -1.8);
      const expectedResultA = new Hex(1, 1, -2);
      expect(hexA.round()).to.deep.equal(expectedResultA);

      const hexB = new Hex(0.199, -0.8, 0.511);
      const expectedResultB = new Hex(0, -1, 1);
      expect(hexB.round()).to.deep.equal(expectedResultB);

      const hexC = new Hex(0.3, 0.499, -0.799);
      const expectedResultC = new Hex(0, 1, -1);
      expect(hexC.round()).to.deep.equal(expectedResultC);
    });
  });

  describe("Lerp", () => {
    it("returns the linear interpolation between two hexagons", () => {
      const hexA = new Hex(0, 0, 0);
      const hexB = new Hex(10, -20, 10);
      const expectedResult = new Hex(5, -10, 5);
      expect(hexA.lerp(hexB, 0.5)).to.deep.equal(expectedResult);
    });
  });

  describe("Linedraw", () => {
    it("returns the hexagons you need to traverse to get from one hexagon to another in a straight line", () => {
      const hexA = new Hex(0, 0, 0);
      const hexB = new Hex(1, -5, 4)
      const expectedResult = [
        new Hex(0, 0, -0),
        new Hex(0, -1, 1),
        new Hex(0, -2, 2),
        new Hex(1, -3, 2),
        new Hex(1, -4, 3),
        new Hex(1, -5, 4),
      ];
      expect(hexA.linedraw(hexB)).to.deep.equal(expectedResult);
    });
  });

  describe("Ring", () => {
    it("throws an error if the radius is negative or 0", () => {
      const hex = new Hex(1, -5, 4)
      const negativeRadiusRing = () => { hex.ring(-1) };
      expect(negativeRadiusRing).to.throw(Error, "Radius must be positive");
    });

    it("returns the hexagons that form a ring around the origin", () => {
      const hex = new Hex(1, -5, 4)
      const expectedResult = [
        new Hex(-1, -3, 4),
        new Hex(0, -3, 3),
        new Hex(1, -3, 2),
        new Hex(2, -4, 2),
        new Hex(3, -5, 2),
        new Hex(3, -6, 3),
        new Hex(3, -7, 4),
        new Hex(2, -7, 5),
        new Hex(1, -7, 6),
        new Hex(0, -6, 6),
        new Hex(-1, -5, 6),
        new Hex(-1, -4, 5),
      ]
      expect(hex.ring(2)).to.be.deep.members(expectedResult);
    });
  });

  describe("Spiral", () => {
    it("throws an error if the radius is negative or 0", () => {
      const hex = new Hex(1, -5, 4)
      const negativeRadiusSpiral = () => { hex.spiral(-1) };
      expect(negativeRadiusSpiral).to.throw(Error, "Radius must be positive");
    });

    it("returns the hexagons that form a larger hexagon around the origin", () => {
      const hex = new Hex(1, -5, 4)
      const expectedResult = [
        new Hex(1, -5, 4),
        new Hex(0, -4, 4),
        new Hex(1, -4, 3),
        new Hex(2, -5, 3),
        new Hex(2, -6, 4),
        new Hex(1, -6, 5),
        new Hex(0, -5, 5),
        new Hex(-1, -3, 4),
        new Hex(0, -3, 3),
        new Hex(1, -3, 2),
        new Hex(2, -4, 2),
        new Hex(3, -5, 2),
        new Hex(3, -6, 3),
        new Hex(3, -7, 4),
        new Hex(2, -7, 5),
        new Hex(1, -7, 6),
        new Hex(0, -6, 6),
        new Hex(-1, -5, 6),
        new Hex(-1, -4, 5),
      ]
      expect(hex.spiral(2)).to.be.deep.members(expectedResult);
    });
  });

  describe("ToString", () => {
    it("returns a string with the coordinates of the hexagon", () => {
      const hexA = new Hex(1, 2, -3);
      const expectedResult = "{q:1,r:2,s:-3}";
      expect(hexA.toString()).to.equal(expectedResult);
    });
  });
});
