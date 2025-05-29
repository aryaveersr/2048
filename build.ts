await Bun.build({
  entrypoints: ["src/index.html"],
  outdir: "dist",
  sourcemap: "linked",
  minify: true,
  naming: {
    chunk: "[dir]/[name].[ext]",
    asset: "[dir]/[name].[ext]",
  },
});
