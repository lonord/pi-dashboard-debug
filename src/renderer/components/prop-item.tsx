import { FlexHorizental, IconButton, withFlexAlignItemsCenter } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import { isBoolean, isFunction, isNull, isNumber, isString, isUndefined } from 'util'

export interface PropItemProps {
	name: string
	value: any
	onDelete()
}

export default class PropItem extends React.Component<PropItemProps, any> {
	render() {
		const { name, value, onDelete } = this.props
		let valueStr
		if (isString(value)) {
			valueStr = `"${value}"`
		} else if (isNumber(value) || isBoolean(value)) {
			valueStr = value + ''
		} else if (isFunction(value)) {
			valueStr = 'fn()'
		} else if (isUndefined(value)) {
			valueStr = 'undefined'
		} else if (isNull(value)) {
			valueStr = 'null'
		} else {
			try {
				valueStr = JSON.stringify(value)
			} catch (e) {
				valueStr = 'ERROR JSON'
			}
		}
		return (
			<Wrap>
				<NameText title={name}>{name}:</NameText>
				<ValueText title={valueStr}>{valueStr}</ValueText>
				<DeleteButton icon="times-circle" onClick={onDelete}/>
			</Wrap>
		)
	}
}

const Wrap = withFlexAlignItemsCenter(FlexHorizental.extend`
	padding: 8px 8px 0;
`)

const NameText = styled.span`
	font-size: 14px;
	color: rgb(182, 38, 26);
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const ValueText = styled.span`
	font-size: 14px;
	color: rgb(36, 36, 36);
	max-width: 800px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`

const DeleteButton = styled(IconButton) `
	color: red;
`
