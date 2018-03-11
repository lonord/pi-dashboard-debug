import * as React from 'react'
import styled from 'styled-components'

class App extends React.Component<any, any> {
	render() {
		if (this.props.err) {
			throw new Error('Error!!!')
		}
		return (
			<Wrap>
				{JSON.stringify(this.props)}
			</Wrap>
		)
	}
}
const Wrap = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: blue;
	color: white;
`

export const Comp = App
export const version = '1.0.0'
export const name = 'example'
