import {LocalStorage, LoadingBar, Notify} from 'quasar'

const { VITE_token_name } = import.meta.env

export const logout = () => {
	LocalStorage.remove('user')
	LocalStorage.remove(VITE_token_name)
	document.location.reload()
}

export const myNotify = error => {
	console.log(error.response.data)
	console.log(error.response.status)
	let { data, status } = error.response
	let errorRequest = error.request
	if (error.response) {
		Notify.create({
			message: JSON.stringify(data) ?? 'Неизвестная ошибка'
		})
		loadingBarStop()
	} else if (errorRequest) {
		Notify.create({
			message: JSON.stringify(data) ?? 'Неизвестная ошибка'
		})
		loadingBarStop()
		console.log(errorRequest)
	} else {
		Notify.create({
			message: JSON.stringify(error)
		})
		console.log('Error', error.message)
		loadingBarStop()
	}
	console.log(error.config)
	loadingBarStop()
	// выйдем если сервер перестал удостоверять пользователя
	if (status === 401) {
		console.log('logout')
		logout()
	}
}

export function loadingBarStart() {
	LoadingBar.start()
}

export function loadingBarStop() {
	LoadingBar.stop()
}

/**
 * обработчик исключений
 * @param arg {any} аргумент вызвавший исключение
 * @param err {Error}
 */
export function errLog(arg, err) {
	const ln = 60
	console.log('='.repeat(ln).red)
	console.log(arg)
	console.log('-'.repeat(ln).magenta)
	console.log(err)
	console.log('='.repeat(ln).red)
}
