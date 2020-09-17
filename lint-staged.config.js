module.exports = {
  '**/*.js?(x)': (filenames) => {
    return [`eslint --fix ${filenames.join(' ')}`, `git add ${filenames.join(' ')}`]
  },
}
