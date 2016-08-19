const assert = require('chai').assert;

var _ = require('underscore');

describe('underscore', function(){
  it('should exist', function(){
    assert(_);
  });

  it('can make a range', function(){
    assert.deepEqual([0,1,2,3,4], _.range(5));
  })
});
