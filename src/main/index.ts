import createTsCompiler from '@lonord/electron-renderer-ts-compiler'
import * as program from 'commander'
import * as electron from 'electron'
import { app, BrowserWindow } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { statSync } from 'fs'
import * as path from 'path'
import * as url from 'url'
import * as cfg from './config'

// tslint:disable-next-line:no-var-requires
const pkg = require('../../package.json')

program
	.allowUnknownOption(true)
	.version(pkg.version)
	.description(pkg.description)
	.option('--debug-brk')
	.option('--inspect=<n>')
	.option('-p, --project <tsconfig>')
	.parse(process.argv)

// tslint:disable-next-line:no-string-literal
global['config'] = cfg

const modulePath = program.args[0]
if (!modulePath) {
	throw new Error('module path is required')
}
// tslint:disable-next-line:no-string-literal
global['modulePath'] = modulePath

const modulePathStat = statSync(modulePath)
const modulePathDir = modulePathStat.isDirectory() ? modulePath : path.dirname(modulePath)
const tsCompiler = createTsCompiler({
	cwd: modulePathDir,
	tsconfig: program.project || 'tsconfig.json'
})
let mainWindow: BrowserWindow

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 800,
		minHeight: 600,

		title: 'Pi Dashboard Module Debugger',
		titleBarStyle: 'hiddenInset'
	})

	// and load the index.html of the app.
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, '../../index.html'),
		protocol: 'file:',
		slashes: true
	}))

	// Open the DevTools.
	mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

app.on('ready', () => {
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log('An error occurred: ', err))
	tsCompiler(createWindow, () => mainWindow && mainWindow.reload())
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit()
})
