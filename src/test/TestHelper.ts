import * as chai from "chai";
import { Vec2D, Hex } from "../lib";

declare global {
  export namespace Chai {
    interface Assertion {
      closeToVec2D(expectedVec2D: Vec2D): Promise<void>;
      closeToHex(expectedHex: Hex): Promise<void>;
    }
  }
}

chai.use(function (_chai, util) {
  const Assertion = _chai.Assertion;
  Assertion.addMethod("closeToVec2D", function (expectedVec2D: Vec2D) {
    const obj = this._obj as Vec2D;
    new Assertion(obj.x).to.be.closeTo(expectedVec2D.x, 0.001);
    new Assertion(obj.y).to.be.closeTo(expectedVec2D.y, 0.001);
  });

  Assertion.addMethod("closeToHex", function (expectedHex: Hex) {
    const obj = this._obj as Hex;
    new Assertion(obj.q).to.be.closeTo(expectedHex.q, 0.001);
    new Assertion(obj.r).to.be.closeTo(expectedHex.r, 0.001);
    new Assertion(obj.s).to.be.closeTo(expectedHex.s, 0.001);
  });
});
