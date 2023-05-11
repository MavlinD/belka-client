import moment from 'moment/moment'

export function saveUser(state, payload) {
	state.user = payload
}

const setDateTime = (arg) => {
	return moment(arg, 'YYYY-MM-DD[T]hh:mm').format('YYYY MMMM')
}

export function periodOptions(state, payload) {
	state.periodOptions = payload.map(el => {
		return {
			value: el,
			label: setDateTime(el)
		}
	})
}

export function indicatorsData(state, payload) {
	state.indicatorsData = payload
}
