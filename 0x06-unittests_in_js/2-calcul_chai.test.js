const { expect } = require('chai');
const calculateNumber = require('./2-calcul_chai');

describe('calculateNumber with chai', () => {
  it('SUM of 1.4 and 4.5 should be 6', () => {
    expect(calculateNumber('SUM', 1.4, 4.5)).to.equal(6);
  });

  it('SUBTRACT of 1.4 and 4.5 should be -4', () => {
    expect(calculateNumber('SUBTRACT', 1.4, 4.5)).to.equal(-4);
  });

  it('DIVIDE of 1.4 and 4.5 should be 0.2', () => {
    expect(calculateNumber('DIVIDE', 1.4, 4.5)).to.equal(0.2);
  });

  it('DIVIDE by 0 should return "Error"', () => {
    expect(calculateNumber('DIVIDE', 1.4, 0)).to.equal('Error');
  });
});
