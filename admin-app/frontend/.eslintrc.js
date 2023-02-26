module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "max-classes-per-file": "off",
    "max-len": "off",
    "import/prefer-default-export": 0,
    "no-underscore-dangle": "off",
    "no-param-reassign": "off",
    "no-continue": "off",
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
  },
};
