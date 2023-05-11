import {createRouter, createWebHistory} from 'vue-router'
import {middlewarePipeline, canUserAccess} from '@/middleware'

// https://vitejs.dev/guide/features.html#glob-import
// все компоненты в папке pages/auto создают автоматические маршруты
const pages = import.meta.glob('./pages/auto/*.vue')

// метаданные адресов
let meta = {
	home: {
		requiresAuth: true,
		middleware: []
	},
	about: {
		requiresAuth: true,
	},
	reports: {
		requiresAuth: true,
		props: true
	},
	'input-data': {
		requiresAuth: true,
		props: true
	},
}

const routes = Object.keys(pages).map((path) => {
	const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase().slice(1,).split('/')[1]
	return {
		path: name === 'home' ? '/' : '/' + name,
		name,
		component: pages[path],
		meta: meta[name],
	}
})

// 404 страница
routes.push(
	{
		path: '/:catchAll(.*)*',
		meta: {
			requiresAuth: true,
		},
		component: () => import('./pages/Error404.vue'),
	},
)

/**
 * обработчик переходов на защищенные адреса
 * разрешено только то, что разрешено явно
 * @param router vue-router instanse
 * @param store vuex instanse
 */
export function routerGuard(router, store) {
	router.beforeEach(async (to, from, next) => {

		const middleware = to.meta?.middleware
		const context = { to, from, next, store }

		const canAccess = await canUserAccess(to, from)

		if (canAccess) {
			middlewarePipeline(context, middleware)
			next()
		} else {
			// редиректим на стр логина если адрес требует авторизации
			next({ name: 'login', query: { from: to.fullPath } })
		}

	})

}

/**
 * собственно роутер
 * @returns {Router}
 */
export function router() {
	return createRouter({
		history: createWebHistory(),
		routes,
	})
}
