import * as React from 'react'
import styled, { injectGlobal } from 'styled-components'
import { Body } from './layouts'
import Main from './main'

injectGlobal`
	* {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		border: 0px;
	}
	html {
		background: white;
		width: 100%;
		height: 100%;
	}
	body {
		padding: 8px;
		width: 100%;
		height: 100%;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
		Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
		user-select: none;
	}
	#react-root {
		height: 100%;
	}
`

export default () => (
	<Body>
		<Main />
	</Body>
)
