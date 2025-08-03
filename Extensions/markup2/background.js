chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "markup2-context-menu",
        title: "Markup",
        contexts: ["all"]
    });
});



chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "markup2-context-menu") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: (tabTitle, tabUrl) => {
                // Inline getLinkTitleFromTag logic
                
                
                const selectedText = window.getSelection ? window.getSelection().toString() : '';
                if(selectedText==''){
                    let title = tabTitle;
                    let additionalText;
                    console.log(title);
                    console.log(tabUrl);
                    let unwantedEnds = [' | SC 3.0', ' | DevExpress Support Center', ' | DevExpress Support'];
                    for (let unwantedEnd of unwantedEnds) {
                        if (title.endsWith(unwantedEnd)) {
                            title = title.replace(unwantedEnd, '');
                        }
                    }
                    // handle dx documentation
                    if (tabUrl.startsWith('https://documentation.devexpress.com') || tabUrl.startsWith('https://docs.devexpress.com')) {
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
                    titleObject = { title, additionalText };
                }else{
                    titleObject = { title: selectedText };
                }   
                //  let link = createLink(url, titleObject);
                
                let fullTitle = titleObject.title;
                if (titleObject.additionalText != undefined){
                    fullTitle = fullTitle + ' ' + titleObject.additionalText;
                }
                let link = `[${fullTitle}](${window.location.href})`;
                
                
                console.log('Target URL:', link);
                // Access and print selected text

                navigator.clipboard.writeText(link)
                .then(() => {
                    // Optionally, you can show a notification or console log
                    console.log('Page address copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy page address:', err);
                });
            },
            args: [tab.title, tab.url]
        });
    }
});


