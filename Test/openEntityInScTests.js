'use strict';
let assert = require('assert');
let mycore = require('../SourceCode/mycore.js');

describe('getLinkTitleFromTag', function() {
  it('should get T663889 from T663889: ASPxTreeListEditor - Duplicate node key exception ', function() {

    // 1. ARRANGE
    let txt0 = 'test T663889: ASPxTreeListEditor - Duplicate node key exception';
    let txt1 = 'test A2944: XPO Best Practices';
    // 2. ACT
    let res0 = mycore.findTicketNoInText(txt0);
    let res1 = mycore.findTicketNoInText(txt1);
    // 3. ASSERT
    assert.equal(res0, 'T663889');
    assert.equal(res1, 'A2944');

  });
  it('should get A1234567 from testtext / A1234567 sometext ', function() {

    // 1. ARRANGE
    let txt = 'testtext / A1234567 sometext';

    // 2. ACT
    let res = mycore.findUserIdInText(txt);

    // 3. ASSERT
    assert.equal(res, 'A1234567');

  });
  it('should get 12123@asdfasdf.com from testtext / 12123@asdfasdf.com sometext ', function() {

    // 1. ARRANGE
    let txt = 'testtext / 12123@asdfasdf.com sometext';

    // 2. ACT
    let res = mycore.findMailInText(txt);

    // 3. ASSERT
    assert.equal(res, '12123@asdfasdf.com');

  });
  it('should get KA18843 from https://www.devexpress.com/Support/Center/Question/Details/KA18843/how-can-i-debug-devexpress ', function() {

    // 1. ARRANGE
    let txt = 'https://www.devexpress.com/Support/Center/Question/Details/KA18843/how-can-i-debug-devexpress';

    // 2. ACT
    let res = mycore.findTicketNoInText(txt);

    // 3. ASSERT
    assert.equal(res, 'KA18843');

  });
  it('should get BC4447 from testtextBC4447testaa ', function() {

    // 1. ARRANGE
    let txt = 'testtextBC4447testaa';

    // 2. ACT
    let res = mycore.findTicketNoInText(txt);

    // 3. ASSERT
    assert.equal(res, 'BC4447');

  });
});
