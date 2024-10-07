export interface IFooterTranslate {
	content: string
	companyDetail: ICompanyTranslate
	overviewDetail: IDetailTranslate[]
	titleCompanyDetail: string
	titleOverviewDetail: string
	copyright: string
}

export interface ICompanyTranslate {
	companyName: string
	MSDN: string
	responsible: string
	address: string
	phone: string
	website: string
}

export interface IDetailTranslate {
	title: string
	href: string
}
