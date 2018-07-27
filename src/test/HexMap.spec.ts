import { expect } from "chai";
import "mocha";
import { Hex, HexMap } from "../lib";

describe("HexMap", () => {

  let emptyHexMap: HexMap;
  let filledHexMap: HexMap;

  beforeEach(() => {
    emptyHexMap = new HexMap();

    filledHexMap = new HexMap([
      new Hex(0, 0, 0),
      new Hex(1, 0, -1),
      new Hex(2, 0, -2),
      new Hex(1, 2, -3),
    ]);
  });


  describe("FromJSON", () => {
    it("creates a new hex map from a json array", () => {
      const json = '[{"q":0,"r":0,"s":0},{"q":1,"r":0,"s":-1},{"q":2,"r":0,"s":-2}]'
      const expectedResult = [
        new Hex(0, 0, 0),
        new Hex(1, 0, -1),
        new Hex(2, 0, -2),
      ];
      expect(HexMap.fromJSON(json).getElements()).to.be.deep.members(expectedResult);
    });
  });

  describe("Constructor", () => {
    it("Creates a new hex map from an array of hexagons", () => {
      const hexArray = [
        new Hex(0, 0, 0),
        new Hex(1, 0, -1),
        new Hex(2, 0, -2),
      ];
      expect(new HexMap(hexArray).getElements()).to.be.deep.members(hexArray);
    });
  });

  describe("Add", () => {
    it("Adds a hexagon to the hex map", () => {
      const hex = new Hex(2, 0, -2)
      emptyHexMap.add(hex);
      expect(emptyHexMap.getElements()).to.deep.include(hex);
    });
  });

  describe("Remove", () => {
    it("removes a hexagon from the hex map", () => {
      const hex = new Hex(2, 0, -2)
      expect(filledHexMap.getElements()).to.deep.include(hex);
      filledHexMap.remove(hex);
      expect(filledHexMap.getElements()).to.not.deep.include(hex);
    });
  });

  describe("Contains", () => {
    it("Returns true if the hex map conatins the element", () => {
      const hex = new Hex(2, 0, -2)
      expect(filledHexMap.getElements()).to.deep.include(hex);
      expect(filledHexMap.contains(hex)).to.be.true;
    });

    it("Returns false if the hex map does not conatins the element", () => {
      const hex = new Hex(7, 0, -7)
      expect(filledHexMap.getElements()).to.not.deep.include(hex);
      expect(filledHexMap.contains(hex)).to.be.false;
    });
  });

  describe("FindPath", () => {
    const hexMap = new HexMap([
      new Hex(0, 0, 0),
      new Hex(1, 0, -1),
      new Hex(0, 1, -1),
      new Hex(-1, 2, -1),
      new Hex(-1, 3, -2),
      new Hex(-2, 4, -2),
      new Hex(1, 4, -5),
      new Hex(2, 4, -6),
      new Hex(4, 2, -6),
      new Hex(0, 2, -2),
      new Hex(1, 1, -2),
      new Hex(2, 3, -5),
      new Hex(-2, 5, -3),
      new Hex(-1, 5, -4),
      new Hex(0, 5, -5),
      new Hex(1, 5, -6),
      new Hex(2, 5, -7),
      new Hex(2, 0, -2),
      new Hex(4, 0, -4),
      new Hex(2, 2, -4),
      new Hex(1, 3, -4),
      new Hex(0, 4, -4),
      new Hex(3, 0, -3),
      new Hex(3, 4, -7),
    ]);

    it("Throws an error if the start or goal are not.getElements of the hex map", () => {
      const pathSearchWithInvalidOrigin = () => hexMap.findPath(new Hex(-10, -10, 20), new Hex(3, 4, -7));
      expect(pathSearchWithInvalidOrigin).to.throw(Error, "The starting point must be an element of the hex map")

      const pathSearchWithInvalidGoal = () => hexMap.findPath(new Hex(0, 0, 0), new Hex(-10, -10, 20));
      expect(pathSearchWithInvalidGoal).to.throw(Error, "The goal must be an element of the hex map")
    });

    it("Finds the shortest path between two hexagons", () => {
      const pathSearchResult = hexMap.findPath(new Hex(0, 0, 0), new Hex(3, 4, -7));
      expect(pathSearchResult.hasPath).to.be.true;
      expect(pathSearchResult.path.length).to.equal(11);
    });

    it("Finds no path when there is no path", () => {
      const pathSearchResult = hexMap.findPath(new Hex(0, 0, 0), new Hex(4, 2, -6));
      expect(pathSearchResult.hasPath).to.be.false;
    });
  });

  describe("ToJSON", () => {
    it("Returns a JSON Array containing the.getElements of the hex map", () => {
      const expectedJSON = '[{"q":0,"r":0,"s":0},{"q":1,"r":0,"s":-1},{"q":2,"r":0,"s":-2},{"q":1,"r":2,"s":-3}]'
      expect(filledHexMap.toJSON()).to.equal(expectedJSON);
    })
  });
});
