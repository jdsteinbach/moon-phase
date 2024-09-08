module.exports = eleventyConfig => {
  // Markdown
  // let markdownIt = require('markdown-it')

  // eleventyConfig.setLibrary('md', markdownIt({
  //   html: true,
  //   breaks: true,
  //   linkify: true,
  //   typographer: true
  // }))

  // Netlify Redirect
  // eleventyConfig.addPassthroughCopy('_redirects')

  // Web Fonts
  // eleventyConfig.addPassthroughCopy('src/fonts')

  //Favicon
  // eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // Watch
  eleventyConfig.addWatchTarget('src/assets/scss/**/*.scss')
  eleventyConfig.addWatchTarget('src/assets/js/**/*.js')

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    templateFormats: ['liquid', 'md', '11ty.js'],
    passthroughFileCopy: true
  }
}
