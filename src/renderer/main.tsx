import * as React from 'react'
import { ComponentDisplayArea, ContentArea, ParamsArea } from './layouts'

export default class Main extends React.Component<any, any> {
	render() {
		return (
			<ContentArea>
				<ParamsArea>params</ParamsArea>
				<ComponentDisplayArea>components</ComponentDisplayArea>
			</ContentArea>
		)
	}
}
