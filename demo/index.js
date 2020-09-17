// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Vue from 'vue'
import ReactDOM from 'react-dom'

// eslint-disable-next-line no-unused-vars
import Container from './Container'
import VConsole from 'vconsole'
import VueDemo from './VueDemo.vue'
import '../src/index'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(VueDemo),
}).$mount('#vueroot')

const GET = (function () {
  const params = {}
  const query = location.href.split('?')
  if (query.length > 1) {
    const buf = query[1].split('&')
    for (let i = 0; i < buf.length; i++) {
      const tmp = buf[i].split('=')
      params[tmp[0]] = tmp[1]
    }
  }

  return params
})()

if (Object.keys(GET).length === 0) {
  location.href = `${location.href}?t=${Date.now()}`
}

// eslint-disable-next-line no-unused-vars
const vConsole = new VConsole()
// console.log(App,vConsole)

// ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<Container />, document.getElementById('root'))
// ReactDOM.render(<div>ufo</div>, document.getElementById('root'))
