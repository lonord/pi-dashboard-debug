import { remote } from 'electron'

export interface ConfigUtil {
	writeProperties(props: any): Promise<void>
	readProperties(): Promise<any>
}
export const configUtil = remote.getGlobal('config') as ConfigUtil
