/**
OE v3.0 
Gulp file generates:
- style_oe3.0.css 
- style_oe3.0_classic.css : 'classic' colour scheme
CSS is readable and compressed.	
- eyedraw_draw_icons.css : Eyedraw doodle icon
- eyedraw-draw-icons-32x32.png : Sprite sheet of Eyedraw doodle icons
JS files for IDG v3 demos
- oe-ui.js
- oe-clinic.js
- oe-oescape
**/

var gulp 			= require('gulp');
// sass
var sass 			= require('gulp-sass');
var autoprefixer	= require('gulp-autoprefixer');
// sprites
var spritesmith 	= require('gulp.spritesmith');
// js
var concat       	= require('gulp-concat');
var uglify       	= require('gulp-uglify'); 
// var pump 			= require('pump');
// files
var rename 			= require('gulp-rename');
var es 				= require('event-stream');
// headers
var header 			= require('gulp-header');


/**
Config
- sprite config var in functions
- don't use relative paths if you want to watch new or deleted files
**/ 
var config = {
	sass:			'./sass/style_oe3.0_pro.scss',					// scss for Pro (dark) OE v3.0  
	classic:		'./sass/style_oe3.0_classic.scss', 				// scss for Classic (light) theme
	print:			'./sass/style_oe3.0_print.scss',				// print
	eyedrawSass:	'./sass/style_eyedraw-draw-icons.scss', 		// eyedraw draw doodle icons
	cssFile:		'style_oe3.0',									// suffixed 
	css:			'./css',
	watchSass:		'./sass/**/*.scss',								// watch scss													
	idgJS: 			'./js/idg/**/*.js',								// ---- watch IDG demo JS files
}

/**
default 
- Build CSS for Pro and Classic themes
- Build IDG demo JS 
- watch...
**/
gulp.task('default',['sass','sass-classic','sass-print','readJS','watch-build']);

/**
Eyedraw icons
- Build sprites & scss for Eyedraw icons
rarely updated, seperate task	
**/
gulp.task('eyedraw-icons', function() {
    gulp.watch( 'img/icons-eyedraw/32x32/**/*.png', ['eyedraw_sprites']); // don't use relative paths if you want to catch new / deleted files
});

/**
Event icons
- Build sprites for Events
rarely updated, seperate task
**/
gulp.task('event-icons', function() {
    gulp.watch( 'img/icons-events/76x76/*.png', ['event_sprites']); // don't use relative paths if you want to catch new / deleted files
    gulp.watch( config.watchSass , ['sass']);
});

/**
watch scss (Pro & Classic themes)	
**/
gulp.task('watch-build', function() {
    gulp.watch( config.watchSass , ['sass','sass-classic','sass-print']);
    gulp.watch( config.idgJS , ['readJS'] ); // IDG demo JS files
});


/*
DateStamp files to allow for comparisson between IDG & OE development
*/
var cssDateStamp = function(){
	return '/* ' + new Date( Date.now() ) + ' */';
}

var oeLegals = function(){
return 		[	'/**',
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
}

/**
PRO theme (v3.0) 
create readable and compressed css	
**/
gulp.task('sass',function(){
		
	var min = gulp.src( config.sass )
				.pipe( sass( {outputStyle:'compressed'} ) )
				.pipe( rename( config.cssFile + '.min.css') )
				.pipe( autoprefixer()) // browserList set in package.json
				.pipe( header( cssDateStamp() ) )
				.pipe( header( oeLegals() ) );
				
					
	var css = gulp.src( config.sass )
				.pipe( sass( {errLogToConsole:true, outputStyle:'expanded'} ).on( 'error', sass.logError ) )
				.pipe(rename( config.cssFile + '.css') )
				.pipe( autoprefixer() ) // browserList set in package.json
				.pipe( header( oeLegals() ) );
					
	// merge and output			
	return	es.merge( min,css ).pipe( gulp.dest( config.css ) );
});

/**
Classic theme (v3.0) 
only creates compressed css 
(as identical to PRO apart from colour changes)
**/
gulp.task('sass-classic',function(){
	
	return gulp.src( config.classic )
		.pipe( sass( {outputStyle:'compressed'} ) )
		.pipe( rename( config.cssFile + '_classic.min.css') )
		.pipe( autoprefixer() ) 
		.pipe( header( cssDateStamp() ) )
		.pipe( header( oeLegals() ) )				
		.pipe( gulp.dest( config.css ) );
});

/**
Print (v3.0) 
only creates compressed css 
**/
gulp.task('sass-print',function(){
	
	return gulp.src( config.print )
		.pipe( sass( {outputStyle:'compressed'} ) )
		.pipe( rename( config.cssFile + '_print.css') )
		.pipe( autoprefixer() ) 
		.pipe( header( cssDateStamp() ) )				
		.pipe( gulp.dest( config.css ) );
});


/**
Eyedraw sprite PNG and SCSS
- creates the PNG sprite sheet for Eyedraw
- creates a SCSS sprite positioning file 
**/
gulp.task('eyedraw_sprites', function () {
	// ensure the path is correct to files or it will fail silently.
	// ALL icons MUST be 32 x 32 px!!
	// Because they are used at 2 sizes: normal and 50% in CSS (.small)
	var spriteIcons = 'img/icons-eyedraw/32x32/**/*.png';
	
	var gulpScss = [	'//',
						'// --- Gulp Generated SCSS file ',
						'// --- Do not edit this file directly ',
						'//',
						'// --- OE Eyedraw Icons - sprite positions',
						'//',
						''].join('\n'); 	

	var spriteData = gulp.src( spriteIcons )
						.pipe(spritesmith({
								imgName: 		'../img/eyedraw-draw-icons-32x32.png', 				// export PNG sprite sheet
								cssName: 		'_eyedraw-draw-sprites.scss',						// create SASS sprite sheet 
								cssTemplate: 	'sass/_handlebars/eyedrawSprite.scss.handlebars', 	// SASS template file
								cssHandlebarsHelpers: { half: function (num) { return num/2; } }
								
					}));
					
   // img
   spriteData.img.pipe(gulp.dest( 'img' ));
   // sass
   spriteData.css.pipe( header( gulpScss) );
   spriteData.css.pipe(gulp.dest( 'sass/eyedraw-icons' ));

   // now we we have a scss file for the sprite positons... 
   gulp.start('eyedraw_sass');
  
});

/**
Eyedraw Draw CSS file
- requires the 'eyedraw-draw-sprites.scss', which
is generated by task 'eyedraw_sprites' below
- creates readable and compressed css	
**/
gulp.task('eyedraw_sass',function(){
	
	var min = gulp.src( config.eyedrawSass )
				.pipe( sass( {outputStyle:'compressed'} ) )
				.pipe( rename('eyedraw_draw_icons.min.css') )
					
	var css = gulp.src( config.eyedrawSass )
				.pipe( sass( {errLogToConsole:true, outputStyle:'expanded'} ).on( 'error', sass.logError ) )
				.pipe( rename('eyedraw_draw_icons.css') )
					
	// merge and output			
	return	es.merge( min,css ).pipe( gulp.dest( config.css ) );
});


/**
Event sprite PNG and SCSS
- creates the PNG sprite sheet for Events
- creates a SCSS sprite positioning file
**/
gulp.task('event_sprites', function () {
	// ensure the path is correct to files or it will fail silently.
	// ALL icons MUST be 76px x 76px
	// Used by CSS at 50% and at 25% (38px & 19px)
	
	var spriteIcons = 'img/icons-events/76x76/*.png';
	
	var gulpScss = ['//',
  '// --- Gulp Generated SCSS file ',
  '// --- Do not edit this file directly ',
  '//',
  '// --- OE Event Icons - sprite positions',
  '//',
  ''].join('\n');  	

	var spriteData = gulp.src( spriteIcons )
						.pipe(spritesmith({
								imgName: 		'../img/event-icons-76x76.png', 					// export PNG sprite sheet
								cssName: 		'_icons-events-sprites.scss',						// create SCSS sprite sheet 
								cssTemplate: 	'sass/_handlebars/eventSprite.scss.handlebars', 	// SCSS template file
								cssHandlebarsHelpers: { 	half: function (num) { return num/2; },
															quarter: function (num) { return num/4; }  }
								
					}));
   
   spriteData.img.pipe(gulp.dest( 'img' ));
   
   spriteData.css.pipe( header( gulpScss) );
   spriteData.css.pipe(gulp.dest( 'sass/openeyes' ));
  
});

// ********************************************

/**
IDG demo JS
Using to gulp to handle all the JS for IDG demos
This is NOT meant for production.
**/
gulp.task( 'readJS', function() {	
	gulp.src( config.idgJS )
	.pipe( concat( 'idg-oe.js' ) )
	.pipe( gulp.dest( './js' ) );
});

/**
Use Pump to get readable Ugilfy errors
**/

/*
gulp.task('uglyJS', function (cb) {
  pump([
      gulp.src( config.idgJS ),
      concat( 'idg-oe.min.js' ),
      uglify(),
      gulp.dest('./js')
    ],
    cb
  );
});
*/





