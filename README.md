# ChromeContextMenuExtensions
#### What is it?
A set of Chrome's extenstions. Provides additional context menu elements to work with DX tickets and documentation.

#### What included?
### 1. Create HTML link.
Creates HTML link to a current page from a selected text (if any) or from a page's title. Provide additional modifications for DX documentation:

![screencast](https://media.giphy.com/media/iDJsyN3zAF8Qd5lUIt/giphy.gif)

### 2. Create Markdown link.
Does the same as 'Create HTML link' but the resulting link is for markdown: (text)[link]

### 4. Open entity.
If there is no selected text - finds a ticket's number in a page's url and opens this ticket in ISC.
If there is a selected text - finds a user's id in the text and opens it in SupportStat. If there is no a user's Id - finds a ticket number and opens this ticket in sc.

### 5. Plain text.
Copies a ticket's subject as plain text.

=================================================
#### How to test:
```sh
$ npm test
```

#### How to build:
```sh
$ .\build
```

#### How to install:
1. Chrome - Settings - More tool - Extensions 
2. Enable developer mode.
3. 'Load upacked'
2. Select a required folder from the '\ChromeContextMenuExtension\Extensions\'

#### Why so many extensions?
If one extensions contains more than one link - Chrome creates a submenu for this extension. There is no way (I didn't find) to create several items in the main context menu from one extension.
