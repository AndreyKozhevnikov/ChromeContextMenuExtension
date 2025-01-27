const INTERVAL = 500;
// setTimeout(function(){
//   console.log('test3423423422222');
//     chrome.tabs.create({url: "https://www.stackoverflow.com", active: false }, tab =>{
//         setTimeout(function(){
//             chrome.tabs.remove(tab.id);
//         },INTERVAL);
//     }); 
// },INTERVAL);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function openTickets() {
ll=document.getElementsByClassName('ticket-id text-center');
console.log('test1-' + ll.length);
 for (let i = 0; i < ll.length; i++) {
     // console.log(`Waiting ${i} seconds...`);
  // let x=ll[i];
     let fullUrl='https://isc.devexpress.com/internal/ticket/details/'+x.innerText;
  // window.open(fullUrl, '_blank')
  // console.log(fullUrl);
  // await sleep(500);
  setTimeout(function(){
  console.log('test3423423422222');
    chrome.tabs.create({url: fullUrl, active: false }, tab =>{
        setTimeout(function(){
           // chrome.tabs.remove(tab.id);
        },INTERVAL);
    }); 
},INTERVAL);
  }

}
function getTicketsData(info, tab) {
  console.log('test0' );
  openTickets();
}
function doStuffWithDom(domContent) {
  console.log('I received the following DOM content:\n' + domContent);
}
function createItems() {
  chrome.contextMenus.create({ title: 'getTicketData', contexts: ['all'], id:'cust123' });
  chrome.contextMenus.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
   // if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
      //  console.dir(tab);
        chrome.tabs.sendMessage(tab.frameId, {text: 'report_back'}, doStuffWithDom);
   // }
   // }
});

}
console.log('test3');
createItems();