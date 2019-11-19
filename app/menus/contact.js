const { shell } = require('electron');

module.exports = {
  label: 'Contact',
  submenu: [
    {
      label: 'Twitter',
      click() {
        shell.openExternal('https://twitter.com/johneas10');
      }
    },
    {
      label: 'Github',
      click() {
        shell.openExternal('https://github.com/johneas10');
      }
    }
  ]
};
