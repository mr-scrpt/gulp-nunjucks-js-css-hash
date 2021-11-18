const { config } = require("../config");
const gulp = require("gulp");
const { readFileSync } = require("fs");
const { src, dest, series } = require("gulp");
const rev = require("gulp-rev");
const revRewrite = require("gulp-rev-rewrite");

exports.revision = gulp.task("revision", () => {
	return gulp
		.src(config.build + config.revision.extension)
		.pipe(rev())
		.pipe(gulp.dest(config.build))
		.pipe(rev.manifest())

		.pipe(gulp.dest(config.build + config.manifest.src));
});

exports.rewrite = gulp.task("rewrite", () => {
	const manifest = readFileSync(config.build + config.manifest.file);
	return gulp
		.src(config.build + config.html.src)
		.pipe(revRewrite({ manifest }))
		.pipe(dest(config.build + config.html.dest));
});
