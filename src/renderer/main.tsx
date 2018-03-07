import {
	Button,
	Dialog,
	FlexItemAdaptive,
	FlexItemFix,
	withFlexVertical
} from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'
import PropInput from './components/prop-input'
import PropItem from './components/prop-item'
import RadioGroup from './components/radio-group'
import { ComponentDisplayArea, ContentArea, ParamsArea } from './layouts'
import { configUtil, modulePath } from './util/remote'

interface MainState {
	sizeType: string
	propsMap: { [key: string]: any }
	isAddPropsDialogOpen: boolean
}

export default class Main extends React.Component<any, MainState> {

	properties = configUtil.readProperties()

	state: MainState = {
		sizeType: 'normal',
		propsMap: this.properties[modulePath],
		isAddPropsDialogOpen: false
	}

	onSizeTypeChange = (value: string) => {
		this.setState({
			sizeType: value
		})
	}

	onDeleteProp = (name: string) => {
		const np = {
			...this.state.propsMap
		}
		delete np[name]
		this.setState({
			propsMap: np
		})
		// TODO save
	}

	onAddProp = (name: string, value: any) => {
		this.closeAddPropDialog()
		const np = {
			...this.state.propsMap,
			[name]: value
		}
		this.setState({
			propsMap: np
		})
		// TODO save
	}

	openAddPropDialog = () => {
		this.setState({
			isAddPropsDialogOpen: true
		})
	}

	closeAddPropDialog = () => {
		this.setState({
			isAddPropsDialogOpen: false
		})
	}

	render() {
		const { sizeType, propsMap, isAddPropsDialogOpen } = this.state
		const propsList = map2List(propsMap)
		return (
			<ContentArea>
				<ParamsArea>
					<SizeSelectRadioWrap>
						<RadioGroup
							identifier="size-type"
							textList={selectTextList}
							valueList={selectTextList}
							value={sizeType}
							onValueChange={this.onSizeTypeChange}/>
					</SizeSelectRadioWrap>
					<PropsContentWrap>
						<PropsContent>
							{propsList.map((p, idx) => (
								<PropItem
									key={idx}
									name={p.key}
									value={p.value}
									onDelete={() => this.onDeleteProp(p.key)} />
							))}
						</PropsContent>
					</PropsContentWrap>
					<FlexItemFix>
						<AddButton onClick={this.openAddPropDialog}>新增属性</AddButton>
						<Dialog title="新增属性" isOpen={isAddPropsDialogOpen} onClose={this.closeAddPropDialog}>
							<PropInput onComplete={this.onAddProp}/>
						</Dialog>
					</FlexItemFix>
				</ParamsArea>
				<ComponentDisplayArea>components</ComponentDisplayArea>
			</ContentArea>
		)
	}
}

const SizeSelectRadioWrap = FlexItemFix.extend`
	padding: 8px;
`
const selectTextList = [
	'small',
	'normal'
]

const PropsContentWrap = withFlexVertical(FlexItemAdaptive.extend`
	padding: 8px;
`)

const PropsContent = FlexItemAdaptive.extend`
	padding: 4px;
	overflow: scroll;
	border: 1px solid #eee;
`

const AddButton = styled(Button) `
	color: orange;
	font-size: 14px;
	padding: 5px 8px;
`

function map2List(map: { [key: string]: any }) {
	const list: Array<{ key: string, value: any }> = []
	for (const key in map) {
		list.push({
			key,
			value: map[key]
		})
	}
	return list
}
