module.exports = {
  "env": {
    "es6":true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "globals": {
    "chrome": true
  },
  "rules": {
    "no-console": 0,
    "no-empty": [1, { "allowEmptyCatch": true }],
    "linebreak-style": 0,
    "semi": 0,
    "consistent-return": 0,
  },
  "extends": "airbnb",
  "parser": "babel-eslint",
}