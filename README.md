# MiddSafe Online Advocate

> The MiddSafe Online Advocate is a tool for peers in need of support and information around sexual assault, stalking, dating violence, domestic violence, and other personal violations. When you’re ready to get started, you will be asked a series of questions in order to find resources that might feel right to you.

## Requirements

- [Jekyll](http://jekyllrb.com/) `sudo gem install jekyll`
- [NodeJS](https://nodejs.org/en/) v12+

## Quick start

```bash
# clone your repo then open terminal in its folder

# install npm packages
npm install

# start local dev server
npm start
```

This will run browser sync server on `http://localhost:3000`. (Browser sync will automatically set it to a different port if you have something running on it. Check what gets output in terminal for the exact URL.)

## Deployment

```bash
npm run deploy
```

1. This will compile jekyll, process and minify CSS and JS, and compress images
2. It will commit the contents of the `_site` directory to the `site` branch and push it to GitHub
3. IT has automated scripts to deploy the contents of the `site` branch on change. Your changes should now be live at its assigned domain.
