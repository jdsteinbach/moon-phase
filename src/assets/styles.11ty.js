const fs = require('fs');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const imageInliner = require('postcss-image-inliner');

// Fhe file name as an entry for Sass & PostCSS compilation
// Also used for the output filename in the `/css` folder
const fileName = 'styles.scss';

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `./scss/${fileName}`)
    console.log(rawFilepath)
    return {
      permalink: `css/${fileName.replace('scss', 'css')}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    }
  }

  async render ({ rawCss, rawFilepath }) {
    const sassToCss = sass.renderSync({
      file: rawFilepath
    });

    const postCssPlugins = [
      // imageInliner({
      //   assetPaths: [
      //     path.join(__dirname, `../_includes/img`)
      //   ],
      //   maxFileSize: 0
      // }),
      autoprefixer
    ];

    if (process.env.ELEVENTY_ENV === 'prod') {
      postCssPlugins.push(cssnano);
    }

    return await postcss(postCssPlugins)
      .process(sassToCss.css.toString(), { from: undefined })
      .then(result => result.css);
  }
}
