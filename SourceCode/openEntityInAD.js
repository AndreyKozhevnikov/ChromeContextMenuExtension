/*global chrome findUserIdInText findTicketNoInText findMailInText */
'use strict';
function openTicketInSC(ticketNo) {
  let scTemplate = 'https://manhattan.devexpress.com/internal/ticket/details/';
  chrome.tabs.create({ url: scTemplate + ticketNo });
}
function openUserIdInSC(userIdOrMail) {
  let scTemplate = 'https://internal.devexpress.com/supportstat/Tools/ViewUser?customer=';
  chrome.tabs.create({ url: scTemplate + userIdOrMail });
}
/* eslint-disable */
{{{findTicketNoInTextTxt}}}
{{{findUserIdInTextTxt}}}
{{{findMailInTextTxt}}}
/* eslint-enable */
function openEntityInSC(info, tab) {
  let textToSearch = info.selectionText ? info.selectionText : tab.url;
  let userId = findUserIdInText(textToSearch);
  let userIdOrMail = userId || findMailInText(textToSearch);
  if (userIdOrMail != undefined) {
    openUserIdInSC(userIdOrMail);
  } else {
    let ticketNo = findTicketNoInText(textToSearch);
    if (ticketNo != undefined)
      openTicketInSC(ticketNo);
  }
}

function createItems() {
  chrome.contextMenus.create({ title: 'Open in AD', contexts: ['all'], onclick: openEntityInSC });
}

createItems();

