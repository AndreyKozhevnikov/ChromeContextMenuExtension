// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// The value that will be written to the clipboard.
const textToCopy = `Hello world2222!`;

// When the browser action is clicked, `addToClipboard()` will use an offscreen
// document to write the value of `textToCopy` to the system clipboard.
function escapeHTML(text) {
  let charMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&apos;',
    '"': '&quot;',
  };
  return text ? text.replace(/[&<>'"]/g, (c) => { return charMap[c]; }) : text;
}
function createLink(url, titleObject){
  /* eslint-enable */
  let escapedTitle = escapeHTML(titleObject.title);
  let st = `<a href="${url}">${escapedTitle}</a>`;
  if (titleObject.additionalText != undefined){
    st = st + ' ' + titleObject.additionalText;
  }
  return st;
}

/* eslint-disable */
function getLinkTitleFromTag(tab) {
  let title = tab.title;
  let additionalText;
  console.log(title);
  console.log(tab.url);
  let unwantedEnds = [' | SC 3.0', ' | DevExpress Support Center', ' | DevExpress Support'];
  for (let unwantedEnd of unwantedEnds) {
    if (title.endsWith(unwantedEnd)) {
      title = title.replace(unwantedEnd, '');
    }
  }
  // handle dx documentation
  if (tab.url.startsWith('https://documentation.devexpress.com') || tab.url.startsWith('https://docs.devexpress.com')) {
    let regex = / \(DevExpress\..+\)$/gi;
    let results = regex.exec(title);
    if (results != null) {
      title = title.replace(results[0], '');
    }
    let lastTitle = title.split(' | ')[0];
    // fit documentation links to members
    let memberTypes = ['property', 'method', 'event', 'interface', 'class'];
    let splittedTitle = lastTitle.split(' ');
    if (splittedTitle.length > 1) {
      let memberType = splittedTitle[splittedTitle.length - 1].toLowerCase();

      if (memberType != undefined && memberTypes.includes(memberType)) {
        if (memberType == 'class' && splittedTitle.length == 2 && splittedTitle[0].endsWith('Attribute')) {
          title = splittedTitle[0].replace('Attribute', '');
          additionalText = 'attribute';
        } else {
          additionalText = memberType;
          splittedTitle.splice(-1, 1);
          title = splittedTitle.join(' ');
        }
      } else {
        title = lastTitle;
      }
    } else {
      title = lastTitle;
    }
  }
  let titleResult = {
    title, additionalText,
  };
  return titleResult;
}


function createLinkOnClick(info, tab) {
  console.dir(info);
  console.dir(info.selectionText);
  console.log(tab);

  let url = tab.url;
  let titleObject;
  if (info.selectionText == null) {
    titleObject = getLinkTitleFromTag(tab);
  } else {
    titleObject = { title: info.selectionText };
  }
  let link = createLink(url, titleObject);
  console.log('sdfsdf234');
  console.dir(link);

  return link;
}


function createItems() {
chrome.contextMenus.create({id: 'htmlItem222', title: 'HTML222', contexts: ['all']});
chrome.contextMenus.onClicked.addListener(async (i,t) => {
  console.log('0000');
  console.dir(i);
  console.dir(t);
  console.log('1111');

  let link=createLinkOnClick(i,t);

  await addToClipboard(link);
});
}

// Solution 1 - As of Jan 2023, service workers cannot directly interact with
// the system clipboard using either `navigator.clipboard` or
// `document.execCommand()`. To work around this, we'll create an offscreen
// document and pass it the data we want to write to the clipboard.
async function addToClipboard(value) {
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: 'Write text to the clipboard.'
  });

  // Now that we have an offscreen document, we can dispatch the
  // message.
  chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: value
  });
}

// Solution 2 – Once extension service workers can use the Clipboard API,
// replace the offscreen document based implementation with something like this.
// eslint-disable-next-line no-unused-vars -- This is an alternative implementation
async function addToClipboardV2(value) {
  navigator.clipboard.writeText(value);
}

createItems();