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
  it('should get T1000424 from T1000424 - Saving the ResourceResources_EventEvents.Events property is prohibited by security rules.', function() {
    // 1. ARRANGE
    let txt0 =
      'T1000424 - Saving the ResourceResources_EventEvents.Events property is prohibited by security rules.';
    // 2. ACT
    let res0 = mycore.findTicketNoInText(txt0);
    // 3. ASSERT
    assert.equal(res0, 'T1000424');
  });
  it('should get userid A1234567 from testtext / A1234567 sometext ', function() {
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
  it('should get manoj@mealcast.io from is manoj@mealcast.io. ', function() {
    // 1. ARRANGE
    let txt = 'is manoj@mealcast.io.';

    // 2. ACT
    let res = mycore.findMailInText(txt);

    // 3. ASSERT
    assert.equal(res, 'manoj@mealcast.io');
  });
  it('should get KA18843 from https://www.devexpress.com/Support/Center/Question/Details/KA18843/how-can-i-debug-devexpress ', function() {
    // 1. ARRANGE
    let txt =
      'https://www.devexpress.com/Support/Center/Question/Details/KA18843/how-can-i-debug-devexpress';

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

describe('getUserIdFromText', function() {
  it('should not find userId from KA18785 ', function() {
    // 1. ARRANGE
    let txt0 =
      'https://www.devexpress.com/Support/Center/Question/Details/KA18785/known-security-system-module-scenarios-unsupported-out-of-the-box';
    // 2. ACT
    let res0 = mycore.findUserIdInText(txt0);
    // 3. ASSERT
    assert.equal(res0, null);
  });

  it('should not find ticketId from A1203557 ', function() {
    // 1. ARRANGE
    let txt0 = 'test text A1203557 txt';
    // 2. ACT
    let res0 = mycore.findTicketNoInText(txt0);
    // 3. ASSERT
    assert.equal(res0, null);
  });

  it('should  find user  from A1203557 ', function() {
    // 1. ARRANGE
    let txt0 = 'test text A1203557 txt';
    // 2. ACT
    let res0 = mycore.findUserIdInText(txt0);
    // 3. ASSERT
    assert.equal(res0, 'A1203557');
  });
  it('should  find user  from A1203557 ', function() {
    // 1. ARRANGE
    let txt0 = 'A1203557';
    // 2. ACT
    let res0 = mycore.findUserIdInText(txt0);
    // 3. ASSERT
    assert.equal(res0, 'A1203557');
  });
});
