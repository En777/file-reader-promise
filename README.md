# file-reader-promise
Wraps [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) in a Promise.

simpler API of HTML5 FileReader:
```javascript
FileReaderPromise.readAsText(file)
.then(function (textResult) {})
```
Enjoy it.

[![npm](https://img.shields.io/npm/v/file-reader-promise.svg)](https://www.npmjs.com/package/file-reader-promise)

## Install
```
npm install --save file-reader-promise
```

## Usage

### Basic syntax
```javascript
const FileReaderPromise = require('file-reader-promise');

FileReaderPromise.readAsText(file)
  .then(text)
  .catch(err => console.error(err));
```

## API
```javascript
FileReaderPromise.readAsArrayBuffer()
FileReaderPromise.readAsBinaryString()
FileReaderPromise.readAsDataURL()
FileReaderPromise.readAsText()

// you can get a simple value(event.target.result) at Promsie chain in default config.
FileReaderPromise.readAsText(file).then(textValue)
// but, if you want a original value, you can set a new config for FileReaderPromise:
const config = { enableSimplify: false }
FileReaderPromise.set(config)
FileReaderPromise.readAsArrayBuffer(file)
.then(function (event) {
  // event is original event of instanceOfFileReader.onload = function (event) {}
  console.log(event.target.result)
  console.log(event.timeStamp)
})
```

### Example: file input
```javascript
const FileReaderPromise = require('file-reader-promise');

function handleImage(imageDataUrl) {
  // ...
}
function handleText(text) {
  // ...
}
function handleArrayBuffer(arrayBuffer) {
  // ...
}

// e.g. <input id="file-input" type="file" />
const fileInput = document.getElementById('file-input');
fileInput.addEventListener("change", handleFiles, false);
function handleFiles(event) {
  const file =  event.target.files[0];

  if(file) {
    if (/^image/.test(file.type)) {
      FileReaderPromise.readAsDataURL(file)
      .then(handleImage)
      .catch(err => console.error(err));
    } else {
      FileReaderPromise.readAsText(file)
      .then(handleText)
      .catch(err => console.error(err));
    }
    // or
    FileReaderPromise.readAsArrayBuffer(file)
      .then(handleArrayBuffer)
      .catch(err => console.error(err));
  }
}
```