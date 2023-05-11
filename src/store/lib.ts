import {Cookies, LoadingBar, LocalStorage} from "quasar"
import axios from "axios"
import {trycatch} from '@/javascript-decorators'
import {myNotify} from '@/components/basis'

const {VITE_token_name, VITE_api_server_name, VITE_api_ext_port} = import.meta.env

/**
 * примесь всех экшен классов стора
 */
export class Transport {

	transport = axios.create({
		baseURL: `http://${VITE_api_server_name}:${VITE_api_ext_port}/api/v2`,
		headers: {
			'Content-Type': 'application/json',
		},
	})

	get token(){
		let tokenPair = LocalStorage.getItem(String(VITE_token_name))
		if (tokenPair){
			return tokenPair?.['access_token']
		}
	}

	/**
	 * авторизует, запросы PUT, PATCH, DELETE авторизованы по умолчанию
	 */
	authorize() {
		// console.log(this.token)
		this.transport.defaults.headers['Authorization'] = `Bearer ${this.token}`
	}

	before() {
		LoadingBar.start()
	}

	after() {
		LoadingBar.stop()
	}

	@trycatch(myNotify)
	async get(url, arg) {
		// console.log(arg)
		this.before()
		let resp = await this.transport.get(url, arg)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async all(arg) {
		// console.log(arg)
		this.before()
		let resp = await this.transport.all(arg)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async post(arg, data, params) {
		// console.log(params)
		this.before()
		let resp = await this.transport.post(arg, data, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async put(arg, params) {
		// console.log(arg)
		// console.log(params)
		this.authorize()
		this.before()
		let resp = await this.transport.put(arg, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async patch(arg, params) {
		// console.log(arg)
		// console.log(params)
		this.authorize()
		this.before()
		let resp = await this.transport.patch(arg, params)
		this.after()
		return resp
	}

	@trycatch(myNotify)
	async delete(arg) {
		// console.log(arg)
		this.authorize()
		this.before()
		let resp = await this.transport.delete(arg)
		this.after()
		return resp
	}

}
