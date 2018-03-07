import {
	FlexItemAdaptive,
	FlexItemFix,
	FlexVertical,
	withFlexHorizental,
	withFlexVertical
} from '@lonord/react-electron-components'
import * as React from 'react'
import styled from 'styled-components'

export const Body = FlexVertical.extend`
	height: 100%;
`

export const HeaderArea = FlexItemFix.extend`
	height: 20px;
`

export const ContentArea = withFlexHorizental(FlexItemAdaptive.extend`
	padding: 4px;
`)

export const ParamsArea = withFlexVertical(FlexItemAdaptive)

export const ComponentDisplayArea = withFlexVertical(FlexItemFix.extend`
	width: 400px;
`)
