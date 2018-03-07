import * as React from 'react'
import styled from 'styled-components'

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	identifier: string
	textList: string[]
	valueList: string[]
	value: string
	onValueChange(value: string)
}
const RadioGroup: React.SFC<RadioGroupProps> = (props) => {
	const { identifier, textList, valueList, value, onValueChange, children, ...rest } = props
	return (
		<div {...rest}>
			{textList.map((text, idx) => (
				<RadioItem key={idx}>
					<RadioInput
						name={identifier}
						type="radio"
						value={valueList[idx]}
						checked={value === valueList[idx]}
						onChange={() => onValueChange(valueList[idx])} />
					<span>{text}</span>
				</RadioItem>
			))}
		</div>
	)
}
export default RadioGroup

const RadioItem = styled.span`
	padding: 4px;
`

const RadioInput = styled.input`
	margin-right: 4px;
`
