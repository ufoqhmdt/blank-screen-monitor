const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync
const pkg = require('../package.json')

exec('npm run build')

const createFormData = (data) =>
  Object.keys(data).reduce((form, name) => {
    form.append(name, data[name])
    return form
  }, new FormData())

const form = createFormData({
  name: '谯洪敏',
  userid: 'qiaohongmin@qutoutiao.net',
  position: '泛前端码农',
  rootdir: `qruntime-bridge-core/${pkg.version}`,
  filename: fs.createReadStream(path.join(__dirname, '../dist', 'index.js')),
})

axios
  .post('http://rd-cdn-services-server.qutoutiao.net/upload', form, {
    headers: form.getHeaders(),
  })
  .then(({ status, statusText, data }) => {
    console.log(status, statusText)
    console.log('data =>', data)
    console.log('upload cdn success!')
    if (data.code === 0) {
      exec('npm publish')
      console.log(pkg.version, 'publish success!')
    }
  })
  .catch((err) => {
    console.log(err)
  })
