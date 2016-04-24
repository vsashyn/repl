export default ({classes, version}) => `
  <div class="${classes.repl}">
    <header class="${classes.header}">
      <a href="https://github.com/jsstyles/jss"></a>
      <section>
        <h2>JSS Playground</h2>
        <p>JSS is on the left, CSS on the right. JSS code is a function body.</p>
        <p>jss@${version}</p>
      </section>
    </header>
    <div class="${classes.sections}">
      <section class="${classes.input}"></section>
      <section class="${classes.output}"></section>
    </div>
  </div>
`