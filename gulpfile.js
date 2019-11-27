/*
OE UI - Gulp generates:
- style_oe3.0.css  					// Pro/Dark (expanded)
- style_oe3.0.min.css				// Pro/Dark (minified) 
- style_oe3.0_classic.min.css		// Classic/Light (minified)
- style_oe3,0_print.css				// Print (minified)
- eyedraw_draw_icons.min.css		// Eyedraw doodle icons (minified)
- eyedraw_draw_icons-32x32.png		// Eyedraw icon spritesheet
- event-icons-76x76.png				// Event icons spritesheet
 */

const config = {
	version: '3.0',
	css: 'style_oe',
	reload: false,
}

const paths = {
	src: {
		sass:		'./src/sass/',
		pro: 		'./src/sass/style_oe_pro.scss',
		classic: 	'./src/sass/style_oe_classic.scss',
		print: 		'./src/sass/style_oe_print.scss',
		eyedraw:	'./src/sass/style_eyedraw-draw-icons.scss',
		watch: 		'./src/sass/**/*.{scss,sass}',
		
				
	},
	dist: {
		css: 		'./css/',
		img:		'./img/',
	},
};

/*
Packages
*/
const {gulp, src, dest, watch, series, parallel} = require('gulp');
const del = require('del');
const flatmap = require('gulp-flatmap');
const lazypipe = require('lazypipe');
const rename = require('gulp-rename');
const header = require('gulp-header');
// styles
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const minify = require('cssnano');			// options for CSS Nano: https://cssnano.co/guides/optimisations/
// SVGs
const svgmin = require('gulp-svgmin');
// sprites
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
// BrowserSync
const browserSync = require('browser-sync');
// Fix for file modifications datetime
const through2 = require('through2');

/*
- Datestamp (for debug)
- Legal header for CSS files
*/
let headerDateStamp = () => '/* ' + new Date( Date.now() ) + ' */';
const headerLegals = [	'/**',
					'*  (C) OpenEyes Foundation, 2018 ',
					'*  This file is part of OpenEyes. ',
					'*',
					'* OpenEyes is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.',
					'* OpenEyes is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.',
					'* You should have received a copy of the GNU Affero General Public License along with OpenEyes in a file titled COPYING. If not, see <http://www.gnu.org/licenses/>.',
					'*',
					'* @link http://www.openeyes.org.uk',
					'*',
					'* @author OpenEyes <info@openeyes.org.uk>',
					'* @copyright Copyright (C) 2017, OpenEyes Foundation',
					'* @license http://www.gnu.org/licenses/agpl-3.0.html The GNU Affero General Public License V3.0',
					'*',
					'*/',
					'',''].join('\n');

/*
-----------------------------
Process and minify SASS files
-----------------------------
*/

/*
PRO (dark) theme
- Expanded CSS file for Debug / Development
- Compressed CSS file for deployment
*/
var proCSS = function (done) {
	// return stream (async task)
	// so task manager knows it's done 
	return src(paths.src.pro)
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: false,		// add sass line and file reference for debug?
			errLogToConsole:true,
		}).on( 'error', sass.logError ))
		.pipe(postcss([
			prefix({					// autoprefix CSS
				cascade: true,
				remove: true
			})
		]))
		.pipe(header( '\n/* Expanded CSS for debugging and development purposes only - use minified version for live site */\n' ))
		.pipe(header( headerDateStamp() ))
		.pipe(rename( config.css + config.version + '.css'))
		.pipe( through2.obj( function( file, enc, cb ) {
			// fixes a 'feature' in Gulp 4 that stops
			// the file modified date from updating correctly...
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb( null, file );
		}) )
		.pipe(dest(paths.dist.css))
		.pipe(postcss([
			minify({
				discardComments: { removeAll: true },
				normalizeWhitespace:true,
				cssDeclarationSorter:true,
				uniqueSelectors:true,
				orderedValues:true,
				discardEmpty:true,
			})
		]))
		.pipe(header( headerDateStamp() ))
		.pipe(header( headerLegals ))
		.pipe(rename({suffix: '.min'}))
		.pipe(dest(paths.dist.css));
};

/*
CLASSIC (light) theme
- Compressed CSS file for deployment
*/
var classicCSS = function (done) {
	return src(paths.src.classic)
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(postcss([
			prefix({					
				cascade: true,
				remove: true
			})
		]))
		.pipe( through2.obj( function( file, enc, cb ) {
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb( null, file );
		}) )
		.pipe(postcss([
			minify({
				discardComments: { removeAll: true },
				normalizeWhitespace:true,
				cssDeclarationSorter:true,
				uniqueSelectors:true,
				orderedValues:true,
				discardEmpty:true,
			})
		]))
		.pipe(header( headerDateStamp() ))
		.pipe(header( headerLegals ))
		.pipe(rename( config.css + config.version + '_classic.min.css'))
		.pipe(dest(paths.dist.css));
};

/*
PRINT
- Compressed CSS file for deployment 
*/
var printCSS = function (done) {
	return src(paths.src.print)
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(postcss([
			prefix({					
				cascade: true,
				remove: true
			})
		]))
		.pipe( through2.obj( function( file, enc, cb ) {
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb( null, file );
		}) )
		.pipe(postcss([
			minify({
				discardComments: { removeAll: true },
				normalizeWhitespace:true,
				cssDeclarationSorter:true,
				uniqueSelectors:true,
				orderedValues:true,
				discardEmpty:true,
			})
		]))
		.pipe(header( headerDateStamp() ))
		.pipe(header( headerLegals ))
		.pipe(rename( config.css + config.version + '_print.css'))
		.pipe(dest(paths.dist.css));
};

/*
-----------------------------
Eyedraw Iconography
-----------------------------
1) Build sprite PNG and SCSS
- creates the PNG sprite sheet for Eyedraw
- creates a SCSS sprite positioning file 
2) then..
- build the Eyedraw CSS
*/

var buildEyedrawIcons = function (done) {
	/*
	Ensure all paths are correct or this will fail silently.
	ALL icons MUST be 32px x 32px, used by CSS at 100% and at 50% 
	*/
	// Generate spritesheet
	var spriteData = src( './src/icons-eyedraw/32x32/**/*.png' )
						.pipe(spritesmith({
								imgName: 		'eyedraw-draw-icons-32x32.png', 							// export PNG sprite sheet
								cssName: 		'_eyedraw-draw-sprites.scss',								// create SASS sprite sheet 
								cssTemplate: 	'./src/sass/_handlebars/eyedrawSprite.scss.handlebars', 	// SASS template file
								cssHandlebarsHelpers: { half: function (num) { return num/2; } }
								
					}));
					
	// Pipe image stream through image optimizer
	spriteData.img
		.pipe(buffer())					//	We must buffer our stream into a Buffer for `imagemin`
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 5})
		]))
		.pipe(dest(paths.dist.img));
					

	// Sass will be optimised by other tasks 
	let sassComments = [	'//',
							'// --- Gulp Generated SCSS file ',
							'// --- Do not edit this file directly ',
							'//',
							'// --- OE Eyedraw Icons - sprite positions',
							'//',
							''].join('\n');	
	
	spriteData.css
		.pipe( header( sassComments) )
		.pipe(dest( paths.src.sass + 'openeyes/' ));
		
	done();
};

var eyedrawCSS = function(done){
	
	return src(paths.src.eyedraw)
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(postcss([
			prefix({					
				cascade: true,
				remove: true
			})
		]))
		.pipe( through2.obj( function( file, enc, cb ) {
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb( null, file );
		}) )
		.pipe(postcss([
			minify({
				discardComments: { removeAll: true },
				normalizeWhitespace:true,
				cssDeclarationSorter:true,
				uniqueSelectors:true,
				orderedValues:true,
				discardEmpty:true,
			})
		]))
		.pipe(header( headerDateStamp() ))
		.pipe(rename( 'eyedraw_draw_icons.min.css' ))
		.pipe(dest(paths.dist.css));
};


/*
-----------------------------
Event Iconography
-----------------------------
Build sprite PNG and SCSS
- PNG: 	img/event-icons-76x76.png
- SCSS: src/sass/_icons-events-sprites.scss (sprite positions)
*/
var buildEventIcons = function(done){
	/*
	Ensure all paths are correct or this will fail silently.
	ALL icons MUST be 76px x 76px, used by CSS at 50% and at 25% e.g. 38px & 19px
	*/
	
	// Generate spritesheet
	let spriteData = src( './src/icons-events/76x76/*.png' )
						.pipe(spritesmith({
								imgName: 		'event-icons-76x76.png', 								// export PNG sprite sheet
								cssName: 		'_icons-events-sprites.scss',							// create SCSS sprite sheet 
								cssTemplate: 	'./src/sass/_handlebars/eventSprite.scss.handlebars', 	// SCSS template file
								cssHandlebarsHelpers: { 	half: function (num) { return num/2; },
															quarter: function (num) { return num/4; }  }		
					}));
	
	// Pipe image stream through image optimizer
	spriteData.img
		.pipe(buffer())					//	We must buffer our stream into a Buffer for `imagemin`
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 5})
		]))
		.pipe(dest(paths.dist.img));

	// Sass will be optimised by other tasks 
	let sassComments = [	'//',
							'// --- Gulp Generated SCSS file ',
							'// --- Do not edit this file directly ',
							'//',
							'// --- OE Event Icons - sprite positions',
							'//',
							''].join('\n');	
	
	spriteData.css
		.pipe( header( sassComments) )
		.pipe(dest( paths.src.sass + 'openeyes/' ));
	
	done();
};


/*
-----------------------------
Task helpers
-----------------------------
*/

// Reload the browser when files change
var reloadBrowser = function (done) {
	if (!config.reload) return done();
	browserSync.reload();
	done();
};

var watchCSS = function(done){
	watch(paths.src.watch, series(exports.buildCSS,reloadBrowser));
	done();
}

/*
-----------------------------
Export Tasks
-----------------------------
*/

// Build all OE CSS files: "gulp buildCSS"
exports.buildCSS = parallel( proCSS, classicCSS, printCSS );

// Build Event sprite sheet and then update all CSS files
exports.eventIcons = series( buildEventIcons, exports.buildCSS );

// Build Eyedraw sprite sheet and CSS
exports.eyedrawIcons = series( buildEyedrawIcons, eyedrawCSS );

// Default task: "gulp"
exports.default = series( exports.buildCSS, watchCSS );


