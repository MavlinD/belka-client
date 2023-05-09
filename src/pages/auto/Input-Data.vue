<template>
	<layout>
		<q-page class="q-px-lg">
			<h3 class="q-ml-xl text-primary">Ввод данных</h3>
			<div id="spreadsheet"></div>
			<br>
			<q-btn class="q-ml-auto" @click="sendData" icon-right="send" label="get-Data"
					 color="secondary"/>
			<br>
			<q-btn class="q-ml-auto" @click="setStyleTblRow" icon-right="send" label="set-Data"
					 color="secondary"/>
		</q-page>
	</layout>
</template>

<script setup>

	import Layout from '@/layouts/default.vue'
	import {useStore} from 'vuex'
	import {setTitle} from '@/middleware'
	import {onMounted, ref} from 'vue'
	import jspreadsheet from 'jspreadsheet-ce'
	import {Transport} from '@/store/lib'
	import moment from 'moment/moment'

	let indicator = 'железо'
	let arr = [
		['fake', '10', '10 октября 2020 г.'],
		[indicator, '11', '10 октября 2020 г.'],
		['', '', ''],
		['', '', ''],
		[indicator, 40.8768, '2023-5-02T00:00'],
		[indicator, '50', '2023-5-01T00:00'],
		['', '', ''],
	]
	setTitle(`Ввод данных`)
	const store = useStore()
	const options = {
		// data: [[]],
		data: arr,
		minDimensions: [3, 5],
		columns: [
			{ title: 'Показатель', width: 350 },
			{ title: 'Ед.изм.', width: 150 },
			{ title: 'Значение', width: 150 }
		]
	}
	const el = 'spreadsheet'

	let sendData = async () => {
		let data = spreadsheet.getData()
		let payload = data.filter(el => el)
		console.log(payload)
		console.log(data)
	}

	let spreadsheet = ref(0)

	let setStyleTblRow = async (tbl, row, col = ['A', 'B', 'C'], bgColor = '#35c88d;') => {
		col.forEach(el => {
			spreadsheet.setStyle({ [`${el}${row}`]: `background-color:${bgColor}` })
		})
	}

	let setDateTime = (arg)=>{
		return moment(arg,"DD MMMM YYYY").format("YYYY-MM-DD[T]hh:mm")
	}
	// let payload = arr.filter(el => (el.filter(Boolean)).length === 3)
	onMounted(async () => {
		spreadsheet = jspreadsheet(document.getElementById(el), options)
		let payload = arr
		let transport = new Transport()
		transport.authorize()
		await Promise.allSettled([
			payload.map(async (el, ind) => {
				if (el[0] && el[1] && el[2]) {
					let req = await transport.put(`log/${el[0]}`, {
						val: el[1],
						date: setDateTime(el[2])
					})
					if (req && req.status === 201) {
						// покрасим загруженные значения
						console.log(ind)
						await setStyleTblRow(spreadsheet, ind + 1)
					}
				}
			})
		])

	})
</script>

<style lang="scss">

	@import '@/css/jexcel.css';
	@import '@/css/jsuites.css';

</style>
