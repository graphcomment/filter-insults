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
      filterInsults = new FilterInsults([
        'insult1',
        'insult2',
        'insult with space',
        'http://example.com',
        'exqi',
      ])
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

    it('detect insults containing spaces', function() {
      assert.isTrue(filterInsults.contains('foo insult with space bar'));
    })

    it('detect uppercase insults', function() {
      assert.isTrue(filterInsults.contains('INSULT1'));
    })

    it('detect links', function() {
      assert.isTrue(filterInsults.contains('http://example.com'));
    })

    it('detect insults with invisible characters', function() {
      var str1 = "exqi"
      var str2 = "exqi︆" // invisible character at the end here
      assert.isFalse(str1 === str2)
      assert.isTrue(filterInsults.contains(str1))
      assert.isTrue(filterInsults.contains(str2))
    })

    it('DONT detect insults not delimited by spaces', function() {
      assert.isFalse(filterInsults.contains('foo insult1bar baz'));
      assert.isFalse(filterInsults.contains('fooinsult1 bar'));
    })
  })

  describe('replace()', function() {
    var filterInsults

    beforeEach(function() {
      filterInsults = new FilterInsults([
        'insult1',
        'insult2',
        'cons',
        'http://example.com',
      ])
    })

    it('do nothing if no insults', function() {
      assert.equal('foo bar baz', filterInsults.replace('foo bar baz'));
    })

    it('DONT replace insults if accent near by', function() {
      assert.equal('la conséquence', filterInsults.replace('la conséquence'));
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

    it('detect links', function() {
      assert.equal(filterInsults.replace('foo http://example.com bar'), 'foo ****************** bar');
    })

    it('DONT replace insults not delimited by spaces', function() {
      assert.equal(filterInsults.replace('insult1baz insult2'), 'insult1baz *******');
      assert.equal(filterInsults.replace('insult1.baz insult2'), '*******.baz *******');
    })
  })

})
