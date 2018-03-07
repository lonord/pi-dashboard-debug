import { Button, FlexHorizental, withFlexAlignItemsCenter } from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import RadioGroup from './radio-group'

export interface PropInputProps {
	onComplete(name: string, value: any)
}

type DataType = 'string' | 'number' | 'boolean' | 'null' | 'json'

interface PropInputState {
	name: string
	textValue: string
	booleanValue: boolean
	type: DataType
	error: string
}

export default class PropInput extends React.Component<PropInputProps, PropInputState> {

	state: PropInputState = {
		name: '',
		textValue: '',
		booleanValue: false,
		type: 'string',
		error: null
	}

	onDataTypeChange = (type: string) => {
		this.setState({
			type: type as DataType
		})
	}

	onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			name: e.target.value
		})
	}

	onTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		this.setState({
			textValue: e.target.value
		})
	}

	onBooleanValueChange = (value: boolean) => {
		this.setState({
			booleanValue: value
		})
	}

	onOK = () => {
		const { onComplete } = this.props
		const { name, textValue, booleanValue, type } = this.state
		if (onComplete) {
			if (!name) {
				this.setState({
					error: 'name is required'
				})
				return
			}
			let value
			if (type === 'string') {
				value = textValue
			} else if (type === 'number') {
				try {
					value = parseInt(textValue)
				} catch (e) {
					this.setState({
						error: 'invalid number'
					})
					return
				}
			} else if (type === 'boolean') {
				value = !!booleanValue
			} else if (type === 'json') {
				try {
					value = JSON.parse(textValue)
				} catch (e) {
					this.setState({
						error: 'invalid json'
					})
					return
				}
			} else {
				value = null
			}
			onComplete(name, value)
		}
	}

	render() {
		const { type, name, textValue, booleanValue, error } = this.state
		let pValueComp = null
		if (type === 'string' || type === 'number') {
			pValueComp = (
				<ValueInputWrap>
					<TextValueInput value={textValue} onChange={this.onTextChange}/>
				</ValueInputWrap>
			)
		} else if (type === 'json') {
			pValueComp = (
				<ValueInputWrap>
					<TextAreaValueInput value={textValue} onChange={this.onTextChange} />
				</ValueInputWrap>
			)
		} else if (type === 'boolean') {
			pValueComp = (
				<ValueInputWrap>
					<InputRadioGroup
						identifier="data-boolean"
						textList={['FALSE', 'TRUE']}
						valueList={['FALSE', 'TRUE']}
						value={booleanValue ? 'TRUE' : 'FALSE'}
						onValueChange={(value) => this.onBooleanValueChange(value === 'TRUE')} />
				</ValueInputWrap>
			)
		} else {
			pValueComp = (
				<ValueInputWrap>NULL</ValueInputWrap>
			)
		}
		return (
			<div>
				<Label>属性名</Label>
				<NameInput value={name} onChange={this.onNameChange}/>
				<Label>属性类型</Label>
				<InputRadioGroup
					identifier="data-type"
					textList={['STR', 'NUM', 'BOOL', 'NULL', 'JSON']}
					valueList={['string', 'number', 'boolean', 'null', 'json']}
					value={type}
					onValueChange={this.onDataTypeChange} />
				<Label>属性值</Label>
				{pValueComp}
				<FooterWrap>
					<OKButton onClick={this.onOK}>新增</OKButton>
					{error
						? <ErrorText>{error}</ErrorText>
						: null}
				</FooterWrap>
			</div>
		)
	}
}

const Label = styled.div`
	font-size: 12px;
	color: #333;
`

const NameInput = styled.input`
	width: 300px;
	height: 30px;
	padding: 4px;
	font-size: 14px;
	margin-bottom: 10px;
	border: 1px solid #eee;
`

const InputRadioGroup = styled(RadioGroup) `
	font-size: 14px;
	margin-bottom: 10px;
`

const ValueInputWrap = styled.div`
	font-size: 14px;
	margin-bottom: 10px;
`

const TextValueInput = styled.input`
	width: 300px;
	height: 30px;
	padding: 4px;
	border: 1px solid #eee;
`

const TextAreaValueInput = styled.textarea`
	width: 300px;
	height: 100px;
	padding: 4px;
	border: 1px solid #eee;
`

const FooterWrap = withFlexAlignItemsCenter(FlexHorizental)

const OKButton = styled(Button) `
	color: green;
	font-size: 14px;
	padding: 5px 8px;
`

const ErrorText = styled.span`
	font-size: 14px;
	display: inline-block;
	margin-left: 30px;
	color: red;
`
