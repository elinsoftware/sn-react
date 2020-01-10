/**
 * This script runs automatically right after the npm `build` script.
 */

const fs = require('fs')
const dirTree = require('directory-tree')
const chalk = require('chalk')
const clear = require('clear')
const PATH_TO_DIST_HTML = 'dist/index.html'

decorateIndexHTML(PATH_TO_DIST_HTML)
outputResults()

function injectJellyWrappers(inputHTML) {
  const JELLY_WRAPPER_START = `<?xml version="1.0" encoding="utf-8" ?>
  <j:jelly
    trim="false"
    xmlns:j="jelly:core"
    xmlns:g="glide"
    xmlns:j2="null"
    xmlns:g2="null"
  >`

  const JELLY_WRAPPER_END = `</j:jelly>`

  return JELLY_WRAPPER_START + inputHTML + JELLY_WRAPPER_END
}

/**
 * Inject code for ServiceNow production authentication
 * before the end of the head tag.
 */
function injectAuthLogic(inputHTML) {
  const AUTH_LOGIC_CODE = `<!-- handle security token for API requests -->
  <div style="display:none">
    <g:evaluate object="true">
      var session = gs.getSession(); var token = session.getSessionToken(); if
      (token=='' || token==undefined) token = gs.getSessionToken();
    </g:evaluate>
  </div>
  <script>
    window.servicenowUserToken = '$[token]'
  </script>
  <!-- handle security token for API requests -->
  `

  const headEndIndex = inputHTML.indexOf('</head')

  return (
    inputHTML.substring(0, headEndIndex) +
    AUTH_LOGIC_CODE +
    inputHTML.substring(headEndIndex)
  )
}

function injectJellyDoctype(inputHTML) {
  const DOCTYPE_JELLY = `<g:evaluate> 
      var docType = '&lt;!DOCTYPE HTML&gt;'; 
  </g:evaluate> 
  <g2:no_escape> 
      $[docType] 
  </g2:no_escape>
    `

  const headIndex = inputHTML.indexOf('<head')

  return (
    inputHTML.substring(0, headIndex) +
    DOCTYPE_JELLY +
    inputHTML.substring(headIndex)
  )
}

function removeHtmlTags(inputHTML) {
  return inputHTML.replace(/(<html>)|(<html.+>)/, '').replace('</html>', '')
}

function removeDocType(inputHTML) {
  return inputHTML.replace('<!DOCTYPE html>', '')
}

function removeDoubleNewlines(inputHTML) {
  return inputHTML.replace(/\s{2,}/gm, '\n')
}

function decorateIndexHTML(pathToHTML) {
  const indexHTMLContent = fs.readFileSync(pathToHTML, 'utf-8')
  let decoratedHTML = indexHTMLContent
  decoratedHTML = removeDocType(decoratedHTML)
  decoratedHTML = removeHtmlTags(decoratedHTML)
  decoratedHTML = removeDoubleNewlines(decoratedHTML)
  decoratedHTML = injectJellyWrappers(decoratedHTML)
  decoratedHTML = injectJellyDoctype(decoratedHTML)
  decoratedHTML = injectAuthLogic(decoratedHTML)

  fs.writeFileSync(pathToHTML, decoratedHTML)
}

function bytesNumToKbsStr(bytesNum) {
  return Math.round(bytesNum / 1000) + 'kB'
}

function outputResults() {
  clear()

  console.log('\n')
  console.log(
    'Find the production build in the ' + chalk.yellow('dist/') + ' directory.'
  )
  console.log('\n')

  try {
    const tree = dirTree('./dist')

    const indexHtml = tree.children.find(child => child.name === 'index.html')
    const roundedSizeKbs = bytesNumToKbsStr(indexHtml.size)
    console.log(chalk.bold(indexHtml.path.replace('/index.html', '')))
    console.log('├── ' + indexHtml.name + ', ' + roundedSizeKbs)
    console.log('\n')

    const apiDir = tree.children.find(child => child.name === 'api')
    const containerDir = apiDir.children[0].children[0].children
    containerDir.forEach(directory => {
      console.log(chalk.bold(directory.path))
      directory.children.forEach(file => {
        const roundedSizeKbs = bytesNumToKbsStr(file.size)
        console.log('├── ' + file.name + ', ' + roundedSizeKbs)
      })
      console.log('\n')
    })

    const totalSize = bytesNumToKbsStr(tree.size)

    console.log(chalk.yellow('Total bundle size: ' + totalSize))
    console.log('See the build files above.')
    console.log('\n')

    console.log(
      chalk.green(
        'Your app production build is ready for deployment in ServiceNow.'
      )
    )
    console.log('\n')
  } catch (err) {
    console.log(err.message)
    console.log(
      chalk.yellow(
        'Something went wrong. There should be an error message above.'
      )
    )
  }
}
