export default function (eleventyConfig) {
  eleventyConfig.addWatchTarget("_content/")

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  }
}
