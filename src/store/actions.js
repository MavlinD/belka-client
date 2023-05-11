import {Transport} from '@/store/lib'

export async function getPeriods(context) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`log/data-datetime-range`)
	context.commit('periodOptions', response.data)
}

export async function getIndicatorsData(context, arg) {
	let transport = new Transport()
	transport.authorize()
	let response = await transport.get(`log/list`, arg)
	// console.log(...response.data?.items)
	context.commit('indicatorsData', response.data)
}
