/* Based on ideas described here: https://medium.com/@mblarsen/wordpress-style-shortcodes-using-vue-js-d2acd20f403f */
<script>
import 'babel-polyfill'
import { default as Tokenizer } from 'shortcode-tokenizer'
import Vue from 'vue'
import SignUp from 'components/conversational/SignUp'
import SignIn from 'components/conversational/SignIn'
import Button from 'components/conversational/Button'
const hyphenate = Vue.util.hyphenate
/* map from code to component */
const codeMap = {
  'sign-in': SignIn,
  'sign-up': SignUp,
  'button' : Button
}
const allComponents = Object.values(codeMap)
  .reduce(function (all, c) {
    all[hyphenate(c.name)] = c
    return all
  }, {})

/* component from the dictionary */
let getComponentName = function (token) {
  if (typeof codeMap[token.name] === 'undefined') {
    throw new Error(`Unknown code: ${token.name}`)
  }
  return hyphenate(codeMap[token.name].name)
}

/* params of the component */
let renderParams = function (token) {
  if (Object.keys(token.params)) {
    return ' ' + Object.entries(token.params)
      .map(pair => {
        if (pair[0] === 'keep-alive') {
          return null
        }
        let value = pair[1]
        let key = ':' + pair[0]
        if (typeof pair[1] === 'string') {
          value = `"${value}"`
          key = pair[0]
        }
        return `${key}=${value}`
      })
      .join(' ')
  }
  return ''
}



/* open & close bracket [name] [/name] */
let renderOpen = function (token) {
  if (token.type === Tokenizer.OPEN) {
    let name = getComponentName(token)
    let params = renderParams(token)
    let children = token.children
      .map(renderToken)
      .join('')
    token.output = `<${name}${params}>${children}</${name}>`
  }
  return token
}

/* self-close braket [name/]*/
let renderSelfClosing = function(token) {
  if (token.type === Tokenizer.SELF_CLOSING) {
    let name = getComponentName(token)
    let params = renderParams(token)
    token.output = `<${name}${params}></${name}>`
  }
  return token
}

let renderText = function (token) {
  if (token.type === Tokenizer.TEXT || token.type === Tokenizer.ERROR) {
    token.output = token.body
  }
  return token
}

let wrapKeepAlive = function (token) {
  if (typeof token.params['keep-alive'] !== 'undefined') {
    token.output = `<keep-alive>${token.output}</keep-alive>`
  }
  return token
}

/* vue needs a root component */
let ensureOneRoot = function(source, content) {
  return source.length > 1 ? `<div>${content}</div>` : content
}

/* functional composition and rendering of components */
/* parser = token |> renderOpen |> renderSelfClosing |> renderText |> wrapKeepAlive */
let renderToken = function (token) {
  return wrapKeepAlive(
      renderText(
        renderSelfClosing(
          renderOpen(token)
        )
      )
    ).output
}

export default { 
  props: {
    content: {
      type: String,
      required: true
    },
    strict: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /* text_message |> tokenizer |> ast |> map(parser) |> ensureOneRoot */
    renderContent() {
      try {
        let ast = this.tokenizer
          .input(this.content)
          .ast()
        let content = ast
          .map(renderToken)
          .join('')
        return ensureOneRoot(ast, content)
      } catch (err) {
        // TODO use error component
        console.error(err)
        return `<div class="error">${err.message}</div>`
      }
    }
  },
  created() {
    this.tokenizer = new Tokenizer()
    this.tokenizer.strict = this.strict
  },
  render(h) {
    return h(Vue.component('parsed-view', {
      template: this.renderContent(),
      components: allComponents
    }))
  }
}
</script>