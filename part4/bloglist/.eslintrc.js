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
    "no-empty": [1, { "allowEmptyCatch": true }]
  },
  "extends": "eslint:recommended"
}