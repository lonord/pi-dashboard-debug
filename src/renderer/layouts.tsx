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

export const ContentArea = withFlexHorizental(FlexItemAdaptive.extend`
	padding: 4px;
`)

export const ParamsArea = withFlexVertical(FlexItemAdaptive.extend`
	user-select: text;
`)

export const ComponentDisplayArea = withFlexVertical(FlexItemFix.extend`
	width: 400px;
`)
