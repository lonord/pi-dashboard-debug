import {
	Button,
	Dialog,
	FlexItemAdaptive,
	FlexItemFix,
	withFlexAllItemsCenter,
	withFlexVertical
} from '@lonord/react-electron-components'
import * as debounce from 'lodash.debounce'
import { basename } from 'path'
import * as React from 'react'
import styled from 'styled-components'
import ModuleAboutDialog from './components/module-about'
import { ModuleItem, RawModuleItemProps, SmallModuleItem } from './components/module-container'
import PropInput from './components/prop-input'
import PropItem from './components/prop-item'
import RadioGroup from './components/radio-group'
import { ComponentDisplayArea, ContentArea, ParamsArea } from './layouts'
import { configUtil, modulePath } from './util/remote'

const moduleName = basename(modulePath)
// tslint:disable-next-line:no-var-requires
const moduleObj = require(modulePath)
const moduleItem: ModuleItem = {
	size: moduleObj.size === 'small' ? 'small' : 'normal',
	Comp: moduleObj.Comp,
	name: moduleName,
	version: moduleObj.version || '-',
	displayName: moduleObj.name || moduleName
}

interface ModuleItem {
	name: string
	size: 'small' | 'normal'
	Comp: React.ComponentType<any>
	version: string
	displayName: string
}

interface MainState {
	sizeType: string
	propsMap: { [key: string]: any }
	isAddPropsDialogOpen: boolean
	isAboutOpen: boolean
	aboutModuleName: string
	aboutModuleID: string
	aboutModuleVersion: string
}

export default class Main extends React.Component<any, MainState> {

	properties = configUtil.readProperties()

	state: MainState = {
		sizeType: 'normal',
		propsMap: this.properties[modulePath],
		isAddPropsDialogOpen: false,
		isAboutOpen: false,
		aboutModuleName: '',
		aboutModuleID: '',
		aboutModuleVersion: ''
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
		}, () => this.saveProperties())
	}

	onAddProp = (name: string, value: any) => {
		this.closeAddPropDialog()
		const np = {
			...this.state.propsMap,
			[name]: value
		}
		this.setState({
			propsMap: np
		}, () => this.saveProperties())
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

	onAboutModuleClose = () => {
		this.setState({
			isAboutOpen: false
		})
	}

	showAboutModule = () => {
		this.setState({
			isAboutOpen: true,
			aboutModuleName: moduleItem.displayName,
			aboutModuleID: moduleItem.name,
			aboutModuleVersion: moduleItem.version
		})
	}

	updateModuleProps = (moduleProps: any) => {
		const newProperties = {
			...moduleProps
		}
		this.setState({
			propsMap: newProperties
		}, () => this.saveProperties())
	}

	doSaveProperties = () => {
		// TODO
	}

	saveProperties = debounce(this.doSaveProperties, 3000)

	render() {
		const {
			sizeType,
			propsMap,
			isAddPropsDialogOpen,
			isAboutOpen,
			aboutModuleName,
			aboutModuleID,
			aboutModuleVersion
		} = this.state
		const propsList = map2List(propsMap)
		const ItemWrap = sizeType === 'small' ? SmallModuleItem : ModuleItem
		const { Comp } = moduleItem
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
				<ComponentDisplayArea>
					<ModuleContentWrap>
						<ItemWrap onLongTap={this.showAboutModule}>
							<Comp updateProps={this.updateModuleProps}/>
						</ItemWrap>
						<ModuleAboutDialog
							isOpen={isAboutOpen}
							displayName={aboutModuleName}
							moduleName={aboutModuleID}
							version={aboutModuleVersion}
							onClose={this.onAboutModuleClose} />
					</ModuleContentWrap>
				</ComponentDisplayArea>
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

const ModuleContentWrap = withFlexAllItemsCenter(withFlexVertical(FlexItemAdaptive))

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
