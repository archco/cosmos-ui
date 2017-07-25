import { expect } from 'chai';
import Color from '../src/js/lib/color';

describe('Color library', function () {

  describe('#constructor', function () {
    it('expect to be an instance of Color', function () {
      let color = new Color('#fff');

      expect(color).to.be.an.instanceof(Color);
    });

    it('expect this._color to be an object', function () {
      let color = new Color({ r: 255, g: 128, b: 0 });
      expect(color._color).to.be.an('object');
    });
  });

  describe('static#lightness', function () {
    it('expect to be a number', function () {
      expect(Color.lightness('#f00')).to.be.a('number');
      expect(Color.lightness([255, 0, 0])).to.be.a('number');
    });

    it('expect to be within 0 ~ 255', function () {
      expect(Color.lightness('#000')).to.be.within(0, 255);
      expect(Color.lightness('#fff')).to.be.within(0, 255);
    });
  });

  describe('static#contrast', function () {
    it('expect to be a string', function () {
      expect(Color.contrast('#f00')).to.be.a('string');
    });

    it('expect contrast color of #f00 to equal #fff', function () {
      expect(Color.contrast('#f00')).to.be.equal('#fff');
    });
  });

  describe('#setColor', function () {
    it('expect this._color object to have property "r"', function () {
      let color = new Color('#f0f200');
      expect(color._color).to.have.have.property('r');
    });

    it('expect this._color object to have property "g"', function () {
      let color = new Color({ r: 255, g: 128, b: 0 });
      expect(color._color).to.have.have.property('g');
    });

    it('expect this._color object to have property "b"', function () {
      let color = new Color([86, 44, 128]);
      expect(color._color).to.have.have.property('b');
    });
  });

  describe('#toHex', function () {
    it('expect result to be equal #dddddd', function () {
      expect(new Color('#ddd').toHex()).to.be.equal('#dddddd');
    });

    it('expect result to be equal #ddd', function () {
      expect(new Color('#dddddd').toHex(true)).to.be.equal('#ddd');
    });
  });
});
