
let assert = require('assert');
var coreModule = require('../SourceCode/mycore.js');

describe('getLinkTitleFromTag', function () {
  it('should get ListView.CollectionSource property from ListView.CollectionSource Property | eXpressApp Framework | DevExpress Help tab title', function () {
    
    // 1. ARRANGE
    let tab={};
    tab.title='ListView.CollectionSource Property | eXpressApp Framework | DevExpress Help';
    tab.url='https://documentation.devexpress.com/eXpressAppFramework/DevExpress.ExpressApp.ListView.CollectionSource.property';
    let expectedTab={};
    expectedTab.title='ListView.CollectionSource';
    expectedTab.additionalText='property';

    // 2. ACT
    let res = coreModule.getLinkTitleFromTag(tab);

    // 3. ASSERT
     assert.equal(JSON.stringify(res), JSON.stringify(expectedTab));
   
  });
   it('should get Session.GetObjectByKey<ClassType> method from Session.GetObjectByKey<ClassType> Method (DevExpress.Xpo) tab title', function () {
    
    // 1. ARRANGE
    let tab={};
    tab.title='Session.GetObjectByKey<ClassType> Method (DevExpress.Xpo)';
    tab.url='https://documentation.devexpress.com/CoreLibraries/DevExpress.Xpo.Session.GetObjectByKey~ClassType~.overloads';
    let expectedTab={};
    expectedTab.title='Session.GetObjectByKey<ClassType>';
    expectedTab.additionalText='method';

    // 2. ACT
    let res = coreModule.getLinkTitleFromTag(tab);

    // 3. ASSERT
    assert.equal(JSON.stringify(res), JSON.stringify(expectedTab));
    
  });
});