import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import pugPlugin from 'vite-plugin-pug'

const options = {} // FIXME: pug pretty is deprecated!
const locals = { name: 'My Pug' }

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				transformAssetUrls,
			}
		}),
		quasar({
			autoImportComponentCase: 'combined',
			sassVariables: 'src/quasar-variables.sass',
			plugins: []
		}),
		pugPlugin(options, locals),
	],
	resolve: {
		alias: {
			'@': '/src/'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
		},
	}
})
