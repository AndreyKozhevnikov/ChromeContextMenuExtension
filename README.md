# ChromeContextMenuExtensions
#### What is it?
A set of Chrome's extenstions. Provides additional context menu elements to work with DX tickets and documentation.

#### What included?
### 1. Create HTML link.
Creates HTML link to a current page from a selected text (if any) or from a page's title. Provide additional modifications for DX documentation:

![screencast](https://media.giphy.com/media/iDJsyN3zAF8Qd5lUIt/giphy.gif)

### 2. Create Markdown link.
Does the same as 'Create HTML link' but the resulting link is for markdown: (text)[link]

### 3. Create Tag Link
If an opened page is a ticket, creates a link like: <sclink viewType="IDSubject" id=""/>

### 4. Open ticket.
Finds a ticket's number in a selected text and opens it in ISC.

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
1. Chrome - Settings - More tool - Extensions - 'Load upacked'
2. Set a required folder from the '\ChromeContextMenuExtension\Extensions\'

#### Why so many extensions?
If one extensions contains more than one link - Chrome creates a submenu for this extension. There is no way (I didn't found) to create several items in the main context menu from one extension.
