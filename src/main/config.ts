import { existsSync, readFile, readFileSync, writeFile, writeFileSync } from 'fs'
import * as mkdirp from 'mkdirp'
import { homedir } from 'os'
import { join } from 'path'
import { promisify } from 'util'

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

const configHome = join(homedir(), '.pi-dashboard-debug')
const propertiesFile = join(configHome, 'properties.json')

mkdirp.sync(configHome)
if (!existsSync(propertiesFile)) {
	writeFileSync(propertiesFile, '{}', 'utf8')
}

async function writeProperties(props: any) {
	try {
		await writeFileAsync(propertiesFile, JSON.stringify(props, null, 2), 'utf8')
	} catch (e) {
		console.error(e)
	}
}

function readProperties() {
	try {
		const content = readFileSync(propertiesFile, 'utf8')
		return JSON.parse(content)
	} catch (e) {
		console.error(e)
		return {}
	}
}

export {
	writeProperties,
	readProperties
}
