const routers = [
    {
        path: '/',
        meta: {
            title: 'login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/home',
        meta: {
            title: 'for you'
        },
        component: (resolve) => require(['./views/home.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: 'login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
	{
		path:'/reset',
		meta: {
			title:'reset'
		},
        component: (resolve) => require(['./views/reset.vue'], resolve)
	}
];
export default routers;