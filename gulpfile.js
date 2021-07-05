/*
Newblue OE UI (CSS & SVG) - Gulp generates:
- style_oe3.0.css					// Pro/Dark (expanded)
- style_oe3.0.min.css				// Pro/Dark (minified) 
- style_oe3.0_classic.min.css		// Classic/Light (minified)
- style_oe3,0_print.css				// Print (minified)
- eyedraw_draw_icons.min.css		// Eyedraw doodle icons (minified)
- eyedraw_draw_icons-32x32.png		// Eyedraw icon spritesheet
- event-icons-76x76.png				// Event icons spritesheet
- Optimised SVG files (these ara an exact copy of src SVG files but optimised)
 */

const config = {
	version: '3',
	css: 'style_oe',
	portal: 'style_portal',
}

const paths = {
	src: {
		sass:		'./src/sass/',
		pro: 		'./src/sass/style_oe_pro.scss',
		classic: 	'./src/sass/style_oe_classic.scss',
		print: 		'./src/sass/style_oe_print.scss',
		eyedraw:	'./src/sass/eyedraw-icons/style_ed-icons.scss',
		svg:		'./src/svg/**/*.svg',
		watch: 		'./src/sass/**/*.{scss,sass}',		
	},
	portal: {
		all: 		'./src/sass/portal/style_portal.scss',
	},
	dist: {
		css: 		'./css/',
		img:		'./img/',
		svg:		'./svg/',
		portal: 	'./dist/portal/',
	},
};

/*
Packages
*/
const {gulp, src, dest, watch, series, parallel} = require('gulp');
const rename = require('gulp-rename');
const header = require('gulp-header');
// styles
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const prefix = require('autoprefixer');
const minify = require('cssnano');			// options for CSS Nano: https://cssnano.co/guides/optimisations/
// SVGs
const svgmin = require('gulp-svgmin');
// sprites
const spritesmith = require('gulp.spritesmith');
const buffer = require('vinyl-buffer');
const imagemin = require('gulp-imagemin');
// Fix for file modifications datetime
const through2 = require('through2');
// Delete and clean before building
const del = require('del');

/*
- Datestamp (for debug)
- Legal header for CSS files
*/
const headerDateStamp = () => '/* ' + new Date( Date.now() ) + ' */';
const headerLegals = [
	'/**',
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
Build compressed CSS file for deployment
*/
var minifyCSS = function(dist, scss, cssFileName){
	// return stream (async task)
	return src(scss)
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(postcss([
			prefix({
				cascade: true,
				remove: true
			}),
			minify({
				discardComments: { removeAll: true },
				normalizeWhitespace:true,
				uniqueSelectors:true,
				orderedValues:true,
				discardEmpty:true,
			})
		]))
		.pipe( through2.obj( function( file, enc, cb ) {
			// fixes a 'feature' in Gulp that stops
			// the file modified date from updating correctly...
			var date = new Date();
			file.stat.atime = date;
			file.stat.mtime = date;
			cb( null, file );
		}))
		.pipe( header( headerDateStamp() ))
		.pipe( header( headerLegals ))
		.pipe( rename( cssFileName ))
		.pipe( dest( dist ));
}

/*
CSS
- Pro (Dark)
- Classic (Light)
- Print (PHP PDF creator)
- EyeDraw (icons for ED3)
*/
var proCSS = function () {
	return minifyCSS(	paths.dist.css,
						paths.src.pro, 
						config.css + config.version + '_dark.min.css');
};

var classicCSS = function () {
	return minifyCSS(	paths.dist.css,
						paths.src.classic, 
						config.css + config.version + '_light.min.css');
};

var printCSS = function () {
	return minifyCSS(	paths.dist.css,
						paths.src.print, 
						config.css + config.version + '_print.min.css');
};

var eyedrawCSS = function(){
	return minifyCSS(	paths.dist.css,
						paths.src.eyedraw, 
						'eyedraw_draw_icons.min.css');
};

/*
Portal
*/
var portalCSS = function () {
	return minifyCSS( 	paths.dist.portal,
						paths.portal.all, 
						config.portal + '.min.css');
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
		.pipe(dest( paths.src.sass + 'eyedraw-icons/' ));
	
	console.log('...wait a bit for Imagemin to finish');
	setTimeout(done, 10000);	
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
	
	console.log('...wait a bit for Imagemin to finish');
	setTimeout(done, 10000);
};


/*
-----------------------------
SVGs
-----------------------------
*/
var optimiseSVG = () => {
	return src(paths.src.svg,{base: './src/svg/'})
			.pipe(svgmin())
			.pipe( dest(paths.dist.svg) );
}


/*
-----------------------------
Task helpers
-----------------------------
*/
var watchCSS = function(done){
	watch(paths.src.watch, series(exports.buildCSS));
	done();
}

var portalWatchCSS = function(done){
	watch(paths.src.watch, series( portalCSS ));
	done();
}

var cleanDist = function(done){
	del.sync([paths.dist.svg]);
	// check what is deleted!
	// const deletedPaths = del.sync([paths.dist.svg], {dryRun: true});
	// console.log('Files and directories that would be deleted:\n', deletedPaths.join('\n'));
	done();
}

/*
-----------------------------
Export Tasks
-----------------------------
*/
exports.svg = series(cleanDist, optimiseSVG);

// Build all OE CSS files: "gulp buildCSS"
exports.buildCSS = parallel( proCSS, classicCSS, printCSS );

// Build Event sprite sheet and then update all CSS files
exports.eventIcons = series( buildEventIcons, exports.buildCSS );

// Build Eyedraw sprite sheet and CSS
exports.eyedrawIcons = series( buildEyedrawIcons, eyedrawCSS, exports.buildCSS);

// Build OE Portal
exports.portal = series( portalCSS, portalWatchCSS );

// Default task: "gulp"
exports.default = series( exports.buildCSS, watchCSS );



