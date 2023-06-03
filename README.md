# 2FA Backup Tools

Everyone should absolutely use [password managers](https://en.wikipedia.org/wiki/Password_manager) for most of their secrets. But sometimes we just have to resort to good ol' paper to back up root passphrases or 2FA recovery codes. USB keys fail at worst times, and cloud solutions still require [something the user knows](https://en.wikipedia.org/wiki/Multi-factor_authentication#Knowledge). That's what the tools in this repository are for &mdash; to [split](#-splitter) the secrets (if necessary), [encode](#-encoder) them as QR codes and print them out. All offline, obviously.

See ['Where do you store your personal private GPG key?'](https://security.stackexchange.com/q/51771) for amusement and additional considerations (such as wiping the printer's memory). Remember though, there is [no absolute security](https://xkcd.com/538/).

## 👨‍👩‍👧‍👦 Splitter

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m791500787-b8b97ee0c3eb92adad46f778?style=for-the-badge)
![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/tfa-backup-splitter.onrender.com?style=for-the-badge)

> https://tfa-backup-splitter.onrender.com

The tool uses [Shamir's Secret Sharing](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing) for splitting the data.

<kbd>
  <p align="center">tfa-backup-splitter.gif</p>
  <img src="/docs/tfa-backup-splitter.gif?raw=true" height="512"/>
</kbd>

## 📝 Encoder

![Uptime Robot status](https://img.shields.io/uptimerobot/status/m791500782-ff9ac5a28fb88d7a258e7c49?style=for-the-badge)
![Mozilla HTTP Observatory Grade](https://img.shields.io/mozilla-observatory/grade/tfa-backup-encoder.onrender.com?style=for-the-badge)

> https://tfa-backup-encoder.onrender.com

Each output page will contain 9 blocks in a grid for easy cutting. Data in each block are encoded into a QR image on blur, and turn back into text on focus again.

<kbd>
  <p align="center">tfa-backup-encoder.gif</p>
  <img src="/docs/tfa-backup-encoder.gif?raw=true" height="512"/>
</kbd>

## Custom deployment

You can use the button below to spin up your own instances on [render.com](https://render.com).

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/dubov94/tfa-backup-tools)
