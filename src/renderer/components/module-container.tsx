import {
	FlexItemAdaptive,
	withFlexVertical,
	withInlineFlexVertical,
	withItemAdaptive,
	withItemFix
} from '@lonord/react-electron-components'
import * as debounce from 'lodash.debounce'
import * as React from 'react'
import styled, { StyledComponentClass } from 'styled-components'
import ErrorBoundary from './error-boundary'
import ModuleAboutDialog from './module-about'

export interface RawModuleItemProps extends React.HTMLAttributes<HTMLDivElement> {
	onLongTap?()
}
class RawModuleItem extends React.Component<RawModuleItemProps, any> {

	downState = {
		x: 0,
		y: 0,
		timestamp: 0
	}
	needCancelClick = false

	onClickDown = (e: React.MouseEvent<HTMLDivElement>) => {
		this.downState = {
			x: e.clientX,
			y: e.clientY,
			timestamp: new Date().getTime()
		}
		this.needCancelClick = false
	}

	onClickUp = (e: React.MouseEvent<HTMLDivElement>) => {
		const { onLongTap } = this.props
		const upState = {
			x: e.clientX,
			y: e.clientY,
			timestamp: new Date().getTime()
		}
		const dx = upState.x - this.downState.x
		const dy = upState.y - this.downState.y
		if (upState.timestamp - this.downState.timestamp > 2000 && Math.sqrt(dx * dx + dy * dy) < 10) {
			onLongTap && onLongTap()
			this.needCancelClick = true
		}
	}

	onClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
		if (this.needCancelClick) {
			e.stopPropagation()
		}
	}

	render() {
		const { children, onLongTap, ...rest } = this.props
		return (
			<div {...rest}>
				<ModuleItemContentWrap
					onMouseDown={this.onClickDown}
					onMouseUp={this.onClickUp}
					onClickCapture={this.onClickCapture}>
					<ModuleItemContent>
						<ErrorBoundary>{children}</ErrorBoundary>
					</ModuleItemContent>
				</ModuleItemContentWrap>
			</div>
		)
	}
}

const ModuleItemContentWrap = withFlexVertical(styled(FlexItemAdaptive) `
	padding: 8px;
	box-shadow: 0px 0px 2px 0px #e0e0e0;
`)

const ModuleItemContent = FlexItemAdaptive.extend`
	overflow: hidden;
	position: relative;
`

export const ModuleItem = withItemFix(withInlineFlexVertical(styled(RawModuleItem) `
	width: 240px;
	height: 240px;
	padding: 4px;
`))

export const SmallModuleItem = styled(ModuleItem) `
	height: 120px;
`
