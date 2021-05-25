/**
 * Minimal self-contained electron application inside an snapshot
 * (C) 2021 Rodolfo Lopez Pintor / Nebular Streams
 * Freeware
 */

// Objecs declared here are visibile in all V8 contexts.

// But when this file gets parsed, all DOM + NodeJS is missing, so you have to enclose everything
// into a closure and call it from main / preloader / renderer ...

// Following example encloses a Main, a Preloader and a Renderer
// See the stubs in stubs/

/**
 *
 * Electron Main Module. You will instance this from the real MAIN
 * when global, require, etc ... are available. Just call this
 * function that will exist, with all these parameters
 *
 * @param global The global object
 * @param require The require function
 * @param module Current Module
 * @param __filename Current Filename
 * @param __dirname Current WD
 */

const MAIN = (global, require, module, __filename, __dirname) => {

	// my main module
	const
		TAG = "[MAIN]",
		{app, BrowserWindow} = require("electron"),
		path = require("path");

	console.log(TAG, "Hey man, I am the MAIN and will instance a browserwindow with preloader and all");

	app.whenReady()
		.then(() => {

			// Create the browser window.
			const
				win = new BrowserWindow({

					width: 1024,
					height: 576,
					useContentSize: true,
					webPreferences: {
						devTools: true,
						preload: path.join(__dirname, "./preload.js"),
						nodeIntegration: true, 		// So we can play around and inspect form webtools
						plugins: false
					}
				});

			win.setTitle("I am snapshotted");
			win.loadFile(path.join(__dirname, "../html/index.html"));

			return win;
		});

};


/**
 *
 * Electron Preloader Module. You will instance this from the real Preloader
 * when global, require, etc ... are available. Just call this
 * function that will exist, with all these parameters
 *
 * @param global The global object
 * @param require The require function
 * @param module Current Module
 * @param __filename Current Filename
 * @param __dirname Current WD
 */

const PRELOAD = (global, require, module, __filename, __dirname) => {

	// my preloader module
	const TAG = "[PRELOADER]";

	console.log(TAG, "Hey man, I am the PRELOADER and will instance an application");


};

// To enclose a Renderer Application
// Million ways to do it, this is the bare minimum

const APPLICATION = (window) => {

	// my main module
	let color = 0;

	window.console.log("this goes to devtools");
	const step = () => {
		document.body.style.backgroundColor = "rgba(" + color + "," + color + ",0)";
		color++;
		color%=255;
		window.requestAnimationFrame(step);
	};
	window.requestAnimationFrame(step);

};
