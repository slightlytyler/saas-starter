const http = require('http');
const path = require('path');
const colors = require('colors/safe');
const { noop } = require('lodash/fp');
const MemoryFS = require('memory-fs');
const requireFromString = require('require-from-string');
const webpack = require('webpack');
const config = require('../../config/webpack/webpack.config.dev');

const { HOST, NODE_ENV, PORT } = process.env;
const DEV = NODE_ENV === 'development';
const outputPath = config.output.path;
let currentApp = noop;
let server = http.createServer(noop);
const start = app => {
	server.removeListener('request', currentApp);
	server.on('request', app);
	currentApp = app;
};

if (DEV) {
	const compiler = webpack(config);
	const fs = new MemoryFS();

	compiler.outputFileSystem = fs;
	compiler.watch({ ignored: '/node_modules/', poll: true }, (err, stats) => {
		if (err) {
			console.error(err.stack || err);
			if (err.details) console.error(err.details);
			return;
		}

		const { default: app } = requireFromString(
			fs.readFileSync(path.join(outputPath, 'main.js')).toString(),
		);
		const info = stats.toJson(config.stats);

		console.log(stats.toString(config.stats));
		start(app);
	});
} else {
	const { default: app } = require(path.join(outputPath, 'main.js'));
	start(app);
}

server.listen(80, () => {
	console.log('\n');
	console.log(colors.bold.white(`=== Gateway running at ${HOST}:${PORT} ===`));
	console.log('\n');
});
