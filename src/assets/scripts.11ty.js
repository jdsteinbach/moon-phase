const fs = require('fs');
const path = require('path');
const rollup = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve').default;
// const { terser } = require('rollup-plugin-terser');

// The file name as an entry for JS bundling/transpiling
// Also used for the output filename in the `/js` folder
const fileName = 'index.js';

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `./js/${fileName}`);

    return {
      permalink: `js/${fileName}`,
      rawFilepath,
      rawJs: await fs.readFileSync(rawFilepath)
    };
  }

  async render ({ rawJs, rawFilepath }) {
    // Plugins used by Rollup
    const rollupPlugins = [
      resolve(),
      babel({ babelHelpers: 'bundled'})
    ];

    // if (process.env.ELEVENTY_ENV === 'prod') {
    //   rollupPlugins.push(terser())
    // }

    const bundle = await rollup.rollup({
      input: rawFilepath,
      plugins: rollupPlugins
    });

    const { output } = await bundle.generate({});

    for (const chunkOrAsset of output) {
      return chunkOrAsset.code;
    }
  }
}
