<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li @click="blank100">模拟100%白屏</li>
      <li @click="blank95">模拟99%白屏</li>
    </ul>
  </div>
</template>

<script>
// import bridge from '@qapp/qapp-bridge'
// import bridge from '../../src/index'
export default {
  name: 'Hello Qu',
  props: {
    msg: String,
  },
  methods: {
    blank100: async function (event) {
      document.querySelector('.hello').hidden = true
    },
    blank95: async function (event) {
      document.querySelector('.hello').hidden = true

      var is100 = 0
      var count = 0
      var randomSet = randomCreateSet()
      for (let index = 0; index < 10000; index++) {
        is100++
        var div = document.createElement('div')
        document.querySelector('#app').appendChild(div)
        if (is100 == 100) {
          // console.log('整百',index)
          is100 = 0
          randomSet = randomCreateSet()
        }

        if (randomSet.has(is100)) {
          count++
          // if(count<=500){
          div.style = 'background:black'
          // }
        }
      }
    },
  },
}

function randomCreateSet() {
  var set = new Set()
  while (true) {
    set.add(getRandomInt(100))
    if (set.size === 1) {
      break
    }
  }
  return set
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

var count = 0
var t = 0
document.querySelector('html').addEventListener('click', (e) => {
  clearTimeout(t)
  t = setTimeout(() => {
    count = 0
    console.log('300ms, reset count to 0')
  }, 300)

  ++count
  if (count >= 5) {
    var hel = document.querySelector('.hello')
    document.querySelector('#app').innerHTML = ''
    hel.hidden = false
    document.querySelector('#app').appendChild(hel)
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  flex-grow: 1;
}
</style>
