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
import FileReaderPromise from 'file-reader-promise';

FileReaderPromise.readAsText(fileData)
  .then(newImage)
  .catch(err => console.error(err));
```

## API
```javascript
FileReaderPromise.readAsArrayBuffer()
FileReaderPromise.readAsBinaryString()
FileReaderPromise.readAsDataURL()
FileReaderPromise.readAsText()

// you can got a simple value(event.target.result) at Promsie chain in default config.
// but, if you want a original value, you can set a new config for FileReaderPromise:
const config = { enableSimplify: false }
FileReaderPromise.set(config)
FileReaderPromise.readAsArrayBuffer()
.then(function (event) {
  // event is original event of instanceOfFileReader.onload = function (event) {}
  console.log(event.target.result)
  console.log(event.timeStamp)
})
```

### Example: file input
```javascript
import FileReaderPromise from 'file-reader-promise';

function newImage(imageDataUrl) {
  ...
}
function newTextFile(text) {
  ...
}
function loadedArrayBuffer(arrayBuffer) {
  ...
}

// e.g. <input id="file-input" type="file" />
const fileInput = document.getElementById('file-input');
fileInput.addEventListener("change", handleFiles, false);
function handleFiles(event) {
  const file =  event.target.files[0];

  if(file) {
    if (/^image/.test(file.type)) {
      FileReaderPromise.readAsDataURL(file)
      .then(newImage)
      .catch(err => console.error(err));
    } else {
      FileReaderPromise.readAsText(file)
      .then(newTextFile)
      .catch(err => console.error(err));
    }
    // or
    FileReaderPromise.readAsArrayBuffer(file)
      .then(loadedArrayBuffer)
      .catch(err => console.error(err));
  }
}
```