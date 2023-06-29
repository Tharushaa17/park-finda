const data = [
  {
    id: "dashboard",
    icon: "iconsminds-dashboard",
    label: "Dashboard",
    to: "/app/dashboard",
  },
  {
    id: "franchises",
    icon: "iconsminds-mens",
    label: "Franchises",
    to: "",
    subs: [
			{
				icon: 'simple-icon-list',
				label: "Franchise List",
				to: '/app/franchises',
			},
			{
				icon: 'simple-icon-plus',
				label: "Create Franchise",
				to: '/app/franchises/create',
			},
		],
  },
  {
    id: "finance",
    icon: "iconsminds-coins",
    label: "Finance Control",
    to: "/app/finance"
  },
  {
    id: "invoices",
    icon: "iconsminds-printer",
    label: "Invoice Advice",
    to: "/app/invoice-advice",
  },
  {
    id: "team",
    icon: "iconsminds-conference",
    label: "Team Permission",
    to: "",
    subs: [
			{
				icon: 'simple-icon-user',
				label: "User",
				to: '/app/teams/user',
        subs: [
          {
            icon: 'simple-icon-user',
            label: "Create User",
            to: '/app/teams/create',
          },
          {
            icon: 'simple-icon-user',
            label: "User List",
            to: '/app/teams/user',
          },
        ]
			},
			{
				icon: 'simple-icon-team',
				label: "Roles",
				to: '/app/teams/roles',
			},
		],
  },
  {
    id: "profile",
    icon: "iconsminds-user",
    label: "Profile",
    to: "/app/profile",
  }
];
export default data;
