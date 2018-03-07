import { remote } from 'electron'

export interface ConfigUtil {
	writeProperties(props: any): Promise<void>
	readProperties(): any
}
export const configUtil = remote.getGlobal('config') as ConfigUtil
export const modulePath = remote.getGlobal('modulePath') as string
