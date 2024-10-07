export interface IDemoTranslate {
	warningChildren: IDemoWarningTranslate
	upstairs: string
	downstairs: string
}

export interface IDemoWarningTranslate {
	attention: string
	contentApplyToBike: string
	contentList: IWarningListTranslate[]
}

export interface IWarningListTranslate {
	contentHot: string
	content: string
}
