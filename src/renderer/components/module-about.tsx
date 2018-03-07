import {
	Dialog,
	DialogProps
} from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'

export interface ModuleAboutDialogProps extends DialogProps {
	displayName: string
	moduleName: string
	version: string
}

export default class ModuleAboutDialog extends React.Component<ModuleAboutDialogProps, any> {
	render() {
		const { displayName, moduleName, version, ...rest } = this.props
		return (
			<Dialog {...rest} title="关于模块">
				<Title>{displayName}</Title>
				<SubTitle>{moduleName}</SubTitle>
				<SubTitle>ver {version}</SubTitle>
			</Dialog>
		)
	}
}

const SubTitle = styled.div`
	font-size: 14px;
	padding: 0 0 10px;
	color: #555;
`

const Title = styled.div`
	font-size: 18px;
	font-family: "Helvetica Neue", Helvetica, Arial;
	font-weight: bold;
	padding: 10px 0;
`
