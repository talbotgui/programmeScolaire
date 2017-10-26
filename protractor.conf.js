// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
const { SpecReporter } = require('jasmine-spec-reporter');
const fs = require('fs');

exports.config = {
	allScriptsTimeout: 11000,
	specs: ['./e2e/**/*.e2e-spec.ts'],
	capabilities: { 'browserName': 'chrome' },
	directConnect: true,
	baseUrl: 'http://localhost:4200/',
	framework: 'jasmine',
	jasmineNodeOpts: { showColors: true, defaultTimeoutInterval: 30000, print: function () { } },
	onPrepare() {
		require('ts-node').register({ project: 'e2e/tsconfig.e2e.json' });
		// Pour avoir les stackstraces
		jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

		// Pour créer un screenshot en cas d'erreur
		jasmine.getEnv().addReporter(new function () {
			this.specDone = function (result) {
				if (result.failedExpectations.length > 0) {
					browser.takeScreenshot().then((png) => {
						const dirName = 'build/e2e-screenshot';
						const fileName = dirName + '/' + result.fullName + '.png';

						if (!fs.existsSync(dirName)) {
							fs.mkdirSync(dirName);
						}
						if (fs.existsSync(fileName)) {
							fs.unlinkSync(fileName);
						}

						const stream = fs.createWriteStream(fileName);
						stream.write(new Buffer(png, 'base64'));
						stream.end();
					});
				}
			}
		});
	}
};
