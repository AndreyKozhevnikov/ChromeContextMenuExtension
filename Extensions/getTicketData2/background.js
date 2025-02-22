// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;
const INTERVAL = 500;
// A function to use as callback
function doStuffWithDom(ticketList) {
    //console.dir('I received the following DOM content:\n' + domContent);
    ticketList.forEach(element => {
    
        console.log(element);
    setTimeout(function(){
       
          chrome.tabs.create({url: element, active: false }, tab =>{
              setTimeout(function(){
                 // chrome.tabs.remove(tab.id);
              },INTERVAL);
          }); 
      },INTERVAL);
    });
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
   // if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
   // }
});