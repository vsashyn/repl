import ace from 'brace'
import 'brace/mode/javascript'
import 'brace/mode/css'
import 'brace/theme/tomorrow'
import jss, {versions} from './jss'
import layout from './layout'
import styles from './theme'
import example from './example'

function render() {
  const sheet = jss.createStyleSheet(styles).attach()
  const div = document.createElement('div')
  div.innerHTML = layout({
    classes: sheet.classes,
    versions
  })
  document.body.appendChild(div)

  const inputElem = document.getElementsByClassName(sheet.classes.input)[0]
  const input = ace.edit(inputElem)
  setupEditor(input, {mode: 'ace/mode/javascript'})


  const outputElem = document.getElementsByClassName(sheet.classes.output)[0]
  const output = ace.edit(outputElem)
  setupEditor(output, {mode: 'ace/mode/css', readonly: true})

  return {input, output, sheet}
}

function setupEditor(editor, options = {}) {
  const session = editor.getSession()

  if (options.readonly) {
    editor.setReadOnly(true)
    delete options.readonly
  }

  session.setOptions({
    tabSize: 2,
    useSoftTabs: true,
    ...options
  })
  editor.setTheme('ace/theme/tomorrow')
  editor.$blockScrolling = Infinity
}

function convert(str) {
  /* eslint-disable no-new-func */
  try {
    return jss.createStyleSheet(new Function(str)()).toString()
  }
  catch (err) {
    return err.message
  }
}

function load({input, output}) {
  const jssStr = localStorage.jss || example
  if (jssStr) {
    renderInput(input, jssStr)
    renderOutput(output, jssStr)
  }
}

function save(str) {
  localStorage.jss = str
}

function listen({input, output}) {
  // React on text input.
  input.addEventListener('change', () => {
    const value = input.getValue()
    save(value)
    renderOutput(output, value)
  })
}

function renderInput(input, str) {
  input.setValue(str)
}

function renderOutput(output, str) {
  output.setValue(convert(str))
  output.clearSelection()
}

(() => {
  const state = render()
  load(state)
  listen(state)
})()
