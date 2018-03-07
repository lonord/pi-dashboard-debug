#!/usr/bin/env node

import { spawn } from 'child_process'
import * as electron from 'electron'
import { join } from 'path'

const args = process.argv.slice(2)
args.unshift(join(__dirname, 'index.js'))

const child = spawn(electron as any as string, args, { stdio: 'inherit' })
child.on('close', (code) => {
	process.exit(code)
})
