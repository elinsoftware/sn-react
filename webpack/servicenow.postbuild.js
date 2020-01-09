/**
 * This script runs automatically right after the npm `build` script.
 */

const fs = require('fs')
const PATH_TO_DIST_HTML = 'dist/index.html'

/**
 * This function adds jelly code to `index.html` to preserve <!DOCTYPE html>
 * on a deployed ServiceNow application.
 */
function injectDoctypeToIndexHtml(pathToHtml) {
  const DOCTYPE_JELLY = `<g:evaluate> 
        var docType = '&lt;!DOCTYPE HTML&gt;'; 
    </g:evaluate> 
    <g2:no_escape> 
        $[docType] 
    </g2:no_escape>
    `

  const inputHtml = fs.readFileSync(pathToHtml, 'utf-8')
  const headIndex = inputHtml.indexOf('<head')
  const htmlBeforeHead = inputHtml.substring(0, headIndex)
  const htmlAfterHead = inputHtml.substring(headIndex)

  const htmlWithJelly = htmlBeforeHead + DOCTYPE_JELLY + htmlAfterHead

  fs.writeFileSync(pathToHtml, htmlWithJelly)
}

injectDoctypeToIndexHtml(PATH_TO_DIST_HTML)
