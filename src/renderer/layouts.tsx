import { FlexItemAdaptive, FlexItemFix, FlexVertical, withFlexHorizental } from '@lonord/react-electron-components'
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

export const ParamsArea = FlexItemAdaptive

export const ComponentDisplayArea = FlexItemFix.extend`
	width: 400px;
`
