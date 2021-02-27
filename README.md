# <img src="https://gitlab.com/NamingThingsIsHard/firefox/bifulushi/-/raw/master/static/icons/icon.png" alt="Drawing" width="42" align="top"/> bifulushi [![Build Status](https://travis-ci.org/LoveIsGrief/bifulushi.svg?branch=master)](https://travis-ci.com/github/LoveIsGrief/bifulushi)

Firefox extension to automatically open websites in a container.

A fork of the wonderful [containerise][containerise_git].
Containerise hadn't been updated in a while so here's an attempt to continue the work done on it.

|![](https://gitlab.com/NamingThingsIsHard/firefox/bifulushi/-/raw/master/static/screenshots/1.png)  |  ![](https://gitlab.com/NamingThingsIsHard/firefox/bifulushi/-/raw/master/static/screenshots/2.png)  |  ![](https://gitlab.com/NamingThingsIsHard/firefox/bifulushi/-/raw/master/static/screenshots/3.png)  |  ![](https://gitlab.com/NamingThingsIsHard/firefox/bifulushi/-/raw/master/static/screenshots/4.png)|
| --- | --- | --- | --- |
|Select your container and add a domain to always open all visits in the chosen container. | Add many domains as you wish. | Special `No Container` option to break out of a container. | Simple CSV based mapping of a domain to a container by name for easy backup and bulk editing. |


# Installation

Access the [XPI directly from IPFS.io][xpi]

For an explanation why there isn't a Mozilla store link, scroll to the bottom.

# Usage

## Basic mapping

`amazon.co.uk, Shopping` will open all amazon.co.uk (not subdomains) links in Shopping container.

## Glob
`!*.amazon.co.uk, Shopping`  will be treated as `*.amazon.co.uk` glob pattern. (suitable to subdomains)

## Regex

`@.+\.amazon\.co\.uk$, Shopping` will be treat as `.+\.amazon\.co\.uk$` regex. (suitable to subdomains and complex paths)



# Development

## Available Scripts
In the project directory, you can run:

#### `npm ci`
Installs required dependencies. 

#### `npm run webpack`
Starts webpack with `--watch` option and outputs to `./build` directory.
 
#### `npm run build`
Builds the extension for production use.<br>

#### `npm run test`
Runs test specs using jest.
Use `test:watch` to watch for edits and re-run the tests.

#### `npm run lint`
Lint using eslint.

#### `npm run web-ext`
Runs web-ext process to debug the extension on Firefox. See [web-ext docs](https://github.com/mozilla/web-ext) <br/>
To live reload the extension, start this process in a new tab after starting `npm run webpack` process.


# Why the extension isn't on the Mozilla store

As of 2021 February, Mozilla doesn't like extensions that allow JS `eval()` to run.
Bifulushi executes `eval()` only within the options page in about:addons
 but that didn't satisfy the reviewers, so they took down the extension.

Since I didn't want to wait on Firefox to implement their [sandboxing feature] and use the extension myself,
 the decision was made to self-publish.
It ended up on [IPFS] simply because it was a fun, promising and educative enterprise.

[containerise_git]: https://github.com/kintesh/containerise
[IPFS]: https://ipfs.io
[sandboxing feature]: https://developer.chrome.com/docs/extensions/mv3/manifest/sandbox/
[xpi]: https://ipfs.io/ipfs/QmPpuzoYbrZtshr1voPpkL1d1P2QNZp4mLaL4w5JrEGTgb/files/1.0.0a.xpi
