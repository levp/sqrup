'use strict';

const path = require('path');
const fsp = require('fs').promises;
const child_process = require('child_process');

const projectRoot = __dirname;
const distDir = path.join(projectRoot, './dist/');

main();

async function main() {
	const pkg = Object.assign({}, require('./package.json'));

	console.log('PUBLISHING VERSION:', pkg.version);

	// Remove `private`
	delete pkg.private;

	// No longer needed
	delete pkg.scripts;
	delete pkg.devDependencies;

	await Promise.all([
		// Write fixed package.json
		fsp.writeFile(
				path.join(distDir, './package.json'),
				JSON.stringify(pkg, null, 2),
		),
		// Copy README.md
		fsp.copyFile(
				path.join(projectRoot, './README.md'),
				path.join(distDir, './README.md'),
		),
	]);

	const process = child_process.spawn('npm', ['publish'], {
		cwd: distDir,
		stdio: 'inherit',
	});

	process.on('close', () => {
		console.log('Publish script finished.');
	});
}
