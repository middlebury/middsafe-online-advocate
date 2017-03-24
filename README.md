# MiddSafe Online Advocate

## Requirements
- [Jekyll](http://jekyllrb.com/) `sudo gem install jekyll`
- [NodeJS](https://nodejs.org/en/) v6.4+
- [Yarn](https://yarnpkg.com/en/docs/install) (optional) `brew install yarn`

## Getting started

Install Node dependencies with NPM or yarn:

```
npm install
```

or

```
yarn
```

## Development

For local development:

```bash
npm start
```

This will run browser sync server on `http://localhost:3000`. (Browser sync will automatically set it to a different port if you have something running on it. Check what gets output in terminal for the exact URL.)

## Deploying to dev and production

### Development

To deploy this to the ["dev site"](https://github.com/middlebury/middsafe-online-advocate/tree/master), you can run `npm run deploy:sandcat`. **You must be connected to the share drive first.** 

If you look at `package.json` `scripts`, you can see this simply copies the `site` directory to the path on sandcat.

### Production

To build and deploy the site for production, run:

```bash
npm run deploy
```

This will compile jekyll, process and minify CSS and JS, and compress images. Then `gulp-gh-pages` will run and push the `site` directory up to https://github.com/middlebury/middsafe-online-advocate/tree/site

After the branch gets pushed to github, you will need to contact WTAS developers to deploy the branch to an actual server. 
