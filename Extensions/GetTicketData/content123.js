let ll;



 function getLinks() {
	ll=document.getElementsByClassName('ticket-id text-center');
  let res=[];
	 for (let i = 0; i < ll.length; i++) {
       // console.log(`Waiting ${i} seconds...`);
       let x=ll[i];
       let fullUrl='https://isc.devexpress.com/internal/ticket/details/'+x.innerText;
       res.push(fullUrl);
    }
    return res;
}

console.log("test333");

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  console.dir(msg);
  if (msg.text === 'report_back') {
      // Call the specified callback, passing
      // the web-page's DOM content as argument

      var links=getLinks();
      sendResponse(links);
  }
});


