const { shell } = require('electron');
const pkg = require('../../package.json');

module.exports = {
  label: 'About',
  submenu: [
    { label: `v${pkg.version}`, enabled: false },
    {
      label: 'Check for updates',
      click() {
        shell.openExternal('https://github.com/johneas10/bankBar/releases');
      }
    }
  ]
};
