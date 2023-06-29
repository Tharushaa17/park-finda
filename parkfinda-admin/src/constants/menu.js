const data = [
	{
		id: 'dashboard',
		icon: 'iconsminds-home',
		label: 'menu.dashboard',
		to: '/app/operator-dashboard',
		roles: ['operator']
	},
	{
		id: 'dashboard',
		icon: 'iconsminds-home',
		label: 'menu.dashboard',
		to: '/app/admin-dashboard',
		roles: ['admin']
	},
	{
		id: 'company',
		icon: 'iconsminds-folders',
		label: 'menu.company',
		to: '/app/company/viewcompany',
		roles: ['operator']
	},
	{
		id: 'company',
		icon: 'iconsminds-folders',
		label: 'menu.company',
		to: '/app/company/list',
		roles: ['admin'],
		subs: [
			{
				icon: 'simple-icon-list',
				label: 'menu.list',
				roles: ['admin'],
				to: '/app/company/list',
			},
			{
				icon: 'simple-icon-note',
				label: 'menu.addcompany',
				roles: ['admin'],
				to: '/app/company/addcompany',
			},
		],
	},
	{
		id: 'operator',
		icon: 'iconsminds-consulting',
		label: 'menu.operator',
		to: '/app/operator/operators',
		roles: ['operator'],
	},
	{
		id: 'carparks',
		icon: 'iconsminds-car',
		label: 'menu.carparks',
		to: '/app/carparks/parklist',
		roles: ['operator'],
	},
	{
		id: 'carparks',
		icon: 'iconsminds-car',
		label: 'menu.carparks',
		to: '/app/carparks/view',
		roles: ['enforcer'],
	},
	{
		id: 'carparks',
		icon: 'iconsminds-car',
		label: 'menu.carparks',
		to: '/app/carparks',
		roles: ['admin'],
		subs: [
			{
				icon: 'simple-icon-list',
				label: 'menu.parklist',
				to: '/app/carparks/parklist',
				roles: ['admin'],
			},
			{
				icon: 'simple-icon-note',
				label: 'menu.addcarpark',
				to: '/app/carparks/addcarpark',
				roles: ['admin'],
			},
		],
	},
	{
		id: 'customer',
		icon: 'iconsminds-male',
		label: 'menu.customer',
		to: '/app/customer',
		roles: ['admin'],
		subs: [
			{
				icon: 'simple-icon-list',
				label: 'menu.customers',
				to: '/app/customer/customers',
				roles: ['admin'],
			},
			{
				icon: 'simple-icon-note',
				label: 'menu.addcustomer',
				to: '/app/customer/addcustomer',
				roles: ['admin'],
			},
		],
	},
	{
		id: 'parking-sessions',
		icon: 'iconsminds-calendar-4',
		label: 'menu.parking-sessions',
		to: '/app/parking-sessions',
		roles: ['admin', 'operator', 'enforcer'],
	},
	{
		id: 'refund',
		icon: 'iconsminds-repeat-5',
		label: 'menu.refund',
		to: '/app/refund',
		roles: ['admin'],
	},
	{
		id: 'reports',
		icon: 'simple-icon-notebook',
		label: 'menu.reports',
		to: '/app/reports',
		roles: ['admin', 'operator'],
		subs: [
			{
				icon: 'iconsminds-refresh',
				label: 'menu.transactions',
				to: '/app/reports/transactions',
				roles: ['admin', 'operator'],
			},
			{
				icon: 'iconsminds-financial',
				label: 'menu.revenue',
				to: '/app/reports/revenue',
				roles: ['admin', 'operator'],
			},
		],
	},
	{
		id: 'remittance-advice',
		icon: 'iconsminds-handshake',
		label: 'menu.advices',
		to: '/app/remittanceadvice',
		roles: ['admin', 'operator'],
	},
	{
		id: 'season-customer',
		icon: 'simple-icon-notebook',
		label: 'menu.season-customer',
		to: '/app/season-customer',
		roles: ['admin', 'operator'],
		subs: [
			{
				icon: 'simple-icon-list',
				label: 'menu.season-customers',
				to: '/app/season-customer/season-customers',
				roles: ['admin', 'operator'],
			},
			{
				icon: 'simple-icon-note',
				label: 'menu.add-season-customer',
				to: '/app/season-customer/add-season-customer',
				roles: ['admin', 'operator'],
			},
		],
	},
	{
		id: 'operator',
		icon: 'iconsminds-consulting',
		label: 'menu.operator',
		to: '/app/operator',
		roles: ['admin'],
		subs: [
			{
				icon: 'simple-icon-list',
				label: 'menu.operator-list',
				to: '/app/operator/operators',
				roles: ['admin'],
			},
			{
				icon: 'simple-icon-note',
				label: 'menu.addoperator',
				to: '/app/operator/addoperator',
				roles: ['admin'],
			},
		],
	}
];
export default data;
