"use strict"

const assert = require('chai').assert
const FilterInsults = require('./filter-insults.js')

describe('FilterInsults', function() {

  it('throw an error if no insult list is provided', function() {
    assert.throws(() => new FilterInsults())
    assert.throws(() => new FilterInsults('foo'))
  })

  describe('contains()', function() {
    var filterInsults

    beforeEach(function() {
      filterInsults = new FilterInsults(['insult1', 'insult2'])
    })

    it('detect insults surrounded by spaces', function() {
      assert.isTrue(filterInsults.contains('foo insult1 bar'));
    })

    it('detect insults at the start|end', function() {
      assert.isTrue(filterInsults.contains('insult1 bar'));
      assert.isTrue(filterInsults.contains('foo insult1'));
    })

    it('detect insults surrounded by special characters', function() {
      assert.isTrue(filterInsults.contains('foo insult1.bar'));
    })

    it('detect uppercase insults', function() {
      assert.isTrue(filterInsults.contains('foo INSULT1 bar'));
    })

    it('DONT detect insults not delimited by spaces', function() {
      assert.isFalse(filterInsults.contains('foo insult1bar'));
    })
  })

  describe('replace()', function() {
    var filterInsults

    beforeEach(function() {
      filterInsults = new FilterInsults(['insult1', 'insult2'])
    })

    it('do nothing if no insults', function() {
      assert.equal('foo bar baz', filterInsults.replace('foo bar baz'));
    })

    it('replace insults', function() {
      assert.equal(filterInsults.replace('foo insult1 baz'), 'foo ******* baz');
    })

    it('replace multiple insults', function() {
      assert.equal(filterInsults.replace('foo insult1 baz insult2'), 'foo ******* baz *******');
    })

    it('replace insults with provided character', function() {
      assert.equal(filterInsults.replace('foo insult1 baz', 'x'), 'foo xxxxxxx baz');
    })
  })

})
