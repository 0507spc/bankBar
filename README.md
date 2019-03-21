# Bankbar: Monzo on your desktop.
[![Github All Releases](https://img.shields.io/github/downloads/johneas10/bankbar/total.svg)]()
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


A small project using the [Monzo API](https://docs.monzo.com/), mostly to get my head around OAuth2.

Login screen:

![](./app/images/icon-readme-login.png)

Light theme:

![](./app/images/icon-readme-light.png)


Dark theme:

![](./app/images/icon-readme-dark.png)

## Disclaimer
- All details and tokens are stored locally and are never saved or sent anywhere else.
- The Monzo API will almost definitely change in future, so the app could break at any time. I will try and update as soon as I can if this happens.

## Features
- Shows your balance the menubar.
- Shows todays spend & transactions.
- Shows pot balances.
- Quick access to bank info (sort code/account number) with ability to quickly copy details.
- Transfer money into a pot with 2 clicks.

A few features I would like to add:
- Instant notifications. Currently not possible as the API doesn't support WebSockets.

## Limitations
Due to Monzo only allowing 20 users per OAuth application, I am unable to distribute a fully packaged app. There are instructions below on how you can build it yourself.

I've only built and tested this on macOS. Feel free to post a PR for Windows or Linux if you get it working 😀

## Installation
### Aquire application credentials:
- Go to the [Developers Portal](https://developers.monzo.com/) and sign in with the email address associated with your Monzo account.
    - Don't have a Monzo account yet? Sign up [here](https://join.monzo.com/r/lgtqft0). We both get £5 💰
- Go to [Clients](https://developers.monzo.com/apps/home) in the top right corner, and create a New OAuth Client.
- Fill in the blanks but make sure that: `Redirect URLs` is set to `https://bankbar-auth-proxy.netlify.com/.netlify/functions/bankbar-proxy` and `Confidentiality` is set to `Confidential`.

_Please note:_

_The redirect URL is a serverless function hosted with Netlify and doesn't save any information. Some email clients strip out custom protocols, so this workaround captures the OAuth token and redirects it to bankBar on your computer._

_The code can be found [here](https://github.com/johneas10/bankBar-serverless-proxy)._

### Download application & enter your credentials:
- Download the latest _.dmg_ from [here](https://github.com/johneas10/bankBar/releases) and copy the application to your applications folder.
- Start the application and enter the `Client ID` and `Client secret` provided by Monzo for your new OAuth Client.
- ![](./app/images/icon.png) 🔝

### (Developer instructions)
- Open up your terminal app and clone the repository: `git clone git@github.com:johneas10/bankbar`.
- run `npm install` and `npm start` to get a local build started.
- run `npm run dist` to build your own version locally. You can find your local build in a new directory called _dist_ within the root of the repository.

## Built With
- [Electron](https://electronjs.org/)
- [Monzo API](https://docs.monzo.com/)

## Contributing
1. Fork it <https://github.com/johneas10/bankbar/fork>
2. Create your feature branch `git checkout -b feature/more_monzo`
3. Commit your changes with [commitizen](https://www.npmjs.com/package/commitizen) `npm run commit`
4. Push to the branch `git push origin feature/more_monzo`
5. Create a new Pull Request against the Develop branch.

## License
Distributed under the MIT license. See `LICENSE` for more information.