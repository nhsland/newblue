'use strict';

/**
-----------------------------
Optimse SVG for distribution
The folder structure in './dist' copies
the stucture within './src', SVG files are 
optimised then updated or created
-----------------------------
*/
const chalk = require('chalk');
const cyan = chalk.bold.cyan;
const red = chalk.bold.red;
const log = console.log;

const fs = require('fs');
const { optimize } = require('svgo');
const chokidar = require('chokidar');

log( cyan(`>>> SVG optimise`));

const paths = {
	src: './src/svg/**/*.svg',
	dist: './dist/svg/'
};

/**
* Recommend SVGO plugin configs
* Not completely sure what they all do..
*/
const config = {
  plugins: [
	'cleanupAttrs',
	'removeDoctype',
	'removeXMLProcInst',
	'removeComments',
	'removeMetadata',
	'removeTitle',
	'removeDesc',
	'removeUselessDefs',
	'removeEditorsNSData',
	'removeEmptyAttrs',
	'removeHiddenElems',
	'removeEmptyText',
	'removeEmptyContainers',
	// 'removeViewBox',
	'cleanupEnableBackground',
	'convertStyleToAttrs',
	'convertColors',
	'convertPathData',
	'convertTransform',
	'removeUnknownsAndDefaults',
	'removeNonInheritableGroupAttrs',
	'removeUselessStrokeAndFill',
	'removeUnusedNS',
	'cleanupIDs',
	'cleanupNumericValues',
	'moveElemsAttrsToGroup',
	'moveGroupAttrsToElems',
	'collapseGroups',
	// 'removeRasterImages',
	'mergePaths',
	'convertShapeToPath',
	'sortAttrs',
	'removeDimensions',
	{ name: 'removeAttrs', params: { attrs: '(stroke|fill)' }},
  ],
};

/**
* Processing 
* If the folder doesn't exist yet first create it
* SVGO reads in the src SVG file then write out the result
* @param {String} svgPath - src file path
*/
const processSVG = ( svgPath ) => {
	// split the file out from the directory path
	const fullPath = svgPath.split('/');
	const svgFile = fullPath.pop();
	
	fullPath.shift(); // [0] = 'src'
	const dist = 'dist/' + fullPath.join('/');
	
	if( !fs.existsSync( dist )){
		console.log(">>> Hmmm, no folder? Create directory: " + dist );
		fs.mkdirSync( dist, { recursive: true }, err => {
			if( err ) log(red('mkdir error: ') +  err );
		});
	};
	
	// read in the file contents
	fs.readFile( svgPath, 'utf8', (err, data ) => {
		if (err) {
			log(red('file read error: ') +  err );
			process.exit(1); // no point continuing
		}
	
		// SVGO 
		const result = optimize( data, { path: `${paths.src}*.svg`, ...config });
		
		// write out the optimised SVG file
		const output = `${dist}/${svgFile}`;
		fs.writeFile( output, result.data, err => {
			if( err ) log(red('file write error: ') +  err );
			log( cyan(`dist: `) + output ); // success!
		});
	});
};

/**
* initialize FS watcher.
* Simple watcher
*/
log( cyan(`... watching, updated or add the SVG src files ... `));

chokidar.watch(`${paths.src}`,{
	ignored: /(^|[\/\\])\../, // ignore dotfiles
	persistent: true
}).on( 'change' , path => {
	log( cyan('src: ') + path );
	processSVG( path );
});


