export const isEmail = (value) =>
  /(.+)@(.+){2,}\.(.+){2,}/.test(/** @type {string} */(value));