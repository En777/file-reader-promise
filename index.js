const defaultConfig = {
  // FileReaderPromise readAsText return event.target.result or event
  enableSimplify: true,
}
const config = Object.assign(defaultConfig)

function getPromisifyReadFn (name) {
  return function (blob) {
    const argumentsOuter = arguments
    const enableSimplify = config.enableSimplify

    return new Promise(function (resolve, reject) {
      const reader = new FileReader()

      reader.onloadend = function (event) {
        const result = enableSimplify ? event.target.result : event
        // console.log(result)
        resolve(result)
      }
      reader.onerror = function (error) {
        reject(error)
      }

      reader[name].apply(reader, argumentsOuter)
    })
  }
}

const FileReaderPromise = {
  set (newConfig) {
    Object.assign(config, newConfig)
  },
}

function isFunction (value) {
  return typeof value === 'function'
}

function addMethods () {
  const reader = new FileReader()

  // readAsArrayBuffer()/readAsText()/...
  for (let prop in reader) {
    if (!reader.hasOwnProperty(prop) && isFunction(reader[prop])) {
      FileReaderPromise[prop] = getPromisifyReadFn(prop)
    }
  }
}

// suppoted SSR for next.js/nuxt.js
if (typeof FileReader === 'function') {
  addMethods()
}

// ES2015 export (it has problems with babel and webpack)
// export default FileReaderPromise
// commonjs export
module.exports = FileReaderPromise
