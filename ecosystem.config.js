const { IGNORE } = require("sequelize/types/lib/index-hints");

module.exports = {
  apps : [
    {
    name: 'server',
    script: 'index.js',
    watch: true,
    ignore_watch: ['uploads']
    }
  ]
};
