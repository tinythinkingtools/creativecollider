'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';

var exec = require('child_process').exec;
const plugins = gulpLoadPlugins({
	pattern: ['*{-,.}*', 'cssnano', 'autoprefixer', 'browserify', 'babelify']
});

//console.log(plugins);

const ENV = {
	distClient: 'public/',
	srcClient: 'src/client'
};

/*Build styles */

gulp.task('styles', () => {
	const processors = [
		plugins.autoprefixer({
			browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10', 'ie 11']
		}), plugins.cssMqpacker
	];
	return gulp.src(`${ENV.srcClient}/styles/styles.scss`)
		.pipe(plugins.plumber({
			errorHandler: plugins.notify.onError("Error: <%= error.message %>")
		}))
		.pipe(plugins.if(process.env.NODE_ENV !== 'production', plugins.sourcemaps.init()))
		.pipe(plugins.sass())
		.pipe(plugins.postcss(processors))
		.pipe(plugins.if(process.env.NODE_ENV !== 'production', plugins.sourcemaps.write('.')))
		.pipe(gulp.dest(`${ENV.distClient}/assets/css/`));
		//.pipe(plugins.livereload());

});

/*Build scripts */

gulp.task('browserify', () => {
	const opts = {
		entries: [`${ENV.srcClient}/app.js`], //entry file
		extensions: ['.js', '.jsx'],
		debug: true,
		cache: {},
		packageCache: {}
	};

	const b = plugins.browserify(opts);
	// use the babelify transform
	b.transform(plugins.babelify, {
		presets: ['es2015', 'react'],
		plugins: ['transform-object-assign']
	});
	const stream = b.bundle()
		.pipe(plugins.plumber({
			handleError: (err) => {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(plugins.vinylSourceStream('scripts.js'))
		.pipe(plugins.vinylBuffer())
		.pipe(plugins.if(process.env.NODE_ENV !== 'production', plugins.sourcemaps.init({
			loadMaps: true
		}))) // loads map from browserify file
		.pipe(plugins.if(process.env.NODE_ENV !== 'production', plugins.sourcemaps.write('.'))) // writes .map file
		.pipe(gulp.dest(`${ENV.distClient}/assets/js/`))
		.pipe(plugins.livereload());
	return stream;
});

/*WATCH */

gulp.task('watch', () => {
	// plugins.livereload.listen();
	gulp.watch([`${ENV.srcClient}/**/*.js`, `${ENV.srcClient}/*.js`], ['browserify']);
	gulp.watch([`${ENV.srcClient}/**/*.jsx`, `${ENV.srcClient}/*.jsx`], ['browserify']);
	// gulp.watch(`${ENV.srcClient}/styles/*.scss`, ['styles']);
});



/*MAIN */

gulp.task('default', () => {
	return runSequence(
		'styles',
		'browserify',
		'watch'
	);
});


/*Production ENV mode */

gulp.task('prod-environment', () => {
	process.env.NODE_ENV = 'production';
});

/* minify client side stuff */

gulp.task('minify-client', () => {
  return gulp.src(ENV.distClient+'/*').pipe(plugins.minifier({
    minify: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: true,
    minifyCSS: true,
    getKeptComment: function (content, filePath) {
      var m = content.match(/\/\*![\s\S]*?\*\//img);
      return m && m.join('\n') + '\n' || '';
    }
  })).pipe(gulp.dest(ENV.distClient));
});

gulp.task('clean-maps-files', function () {
  return gulp.src(ENV.distClient+'**/*.map', {read: false})
    .pipe(plugins.clean());
});

/* DEPLOY */

//&& git push heroku master
const deploy = (cb) => {
	exec('git commit -am "build autocommit" && git push origin master ', (err, stdout, stderr) => {
		console.log(stdout);
		console.log(stderr);
	})
}

gulp.task('deploy', () => {
	return runSequence(
		'prod-environment',
		'styles', 
		'browserify', 
		'clean-maps-files',
		'minify-client',
		deploy
	);
});