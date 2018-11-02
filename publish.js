'use strict';

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const pkg = require('./package.json');

const distDir = path.join(__dirname, './dist/');

// Remove `private`
delete pkg.private;

// No longer needed
delete pkg.scripts;
delete pkg.devDependencies;

fs.writeFileSync(
		path.join(distDir, './package.json'),
		JSON.stringify(pkg, null, 2),
);

const process = child_process.spawn('npm', ['publish'], {
	cwd: distDir,
	stdio: 'inherit',
});

process.on('close', () => {
	console.log('Publish script finished.');
});
