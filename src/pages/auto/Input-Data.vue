<template>
	<layout>
		<q-page class="q-px-lg">
			<div class="row">
				<div class="col-5">
				<h3 class="q-ml-xl text-primary">Ввод данных</h3>
				<p class="q-ml-xl text-primary">Ожидаемый формат даты-времени:
					<strong>DD.MM.YYYY</strong> или
					<strong>DD.MM.YYYY hh:mm</strong>
				</p>
				<div class="q-ml-xl text-primary">Уникальными являются записи с одинаковым показателем и
					временем с точностью до минуты.
				</div>
				<div class="q-ml-xl text-primary">Если данное значение уже содержится в БД, то его
					значение будет обновлено.
				</div>
				<p class="q-ml-xl q-mt-md q-w-50 text-primary">Каждая строка отправляется отдельным
					запросом, при этом все запросы отправляются параллельно,
					успешные загрузки будут выделены зеленым цветом.</p>
				<div class="q-ml-xl q-mt-md" id="spreadsheet"></div>
				<br>
				<q-btn class="q-ml-xl q-mt-md" @click="sendData" icon-right="send" label="send-Data"
						 color="secondary"/>
			</div>
			</div>
		</q-page>
	</layout>
</template>

<script setup>

	import Layout from '@/layouts/default.vue'
	import {setTitle} from '@/middleware'
	import {onMounted, ref} from 'vue'
	import jspreadsheet from 'jspreadsheet-ce'
	import {Transport} from '@/store/lib'
	import moment from 'moment/moment'

	setTitle(`Ввод данных`)
	const options = {
		data: [[]],
		minDimensions: [3, 3],
		columns: [
			{ title: 'Дата', width: 150 },
			{ title: 'Показатель', width: 350 },
			{ title: 'Значение', width: 150 },
		]
	}
	const el = 'spreadsheet'

	let spreadsheet = ref(0)

	const setStyleTblRow = async (tbl, row, col = ['A', 'B', 'C'], bgColor = '#35c88d;') => {
		col.forEach(el => {
			spreadsheet.setStyle({ [`${el}${row}`]: `background-color:${bgColor}` })
		})
	}

	const setDateTime = (arg) => {
		return moment(arg, 'DD.MM.YYYY hh:mm').format('YYYY-MM-DD[T]hh:mm')
	}

	const fetchData = async (table) => {
		const payload = table.getData()
		const transport = new Transport()
		transport.authorize()
		await Promise.allSettled([
			payload.map(async (el, ind) => {
				if (el[0] && el[1] && el[2]) {
					const req = await transport.put(`log/${el[1]}`, {
						date: setDateTime(el[0]),
						val: el[2],
					})
					if (req && req.status === 201) {
						// покрасим загруженные значения
						await setStyleTblRow(spreadsheet, ind + 1)
					}
				}
			})
		])
	}

	const sendData = async () => {
		await fetchData(spreadsheet)
	}

	onMounted(async () => {
		spreadsheet = jspreadsheet(document.getElementById(el), options)
	})

</script>

<style lang="scss">

	@import '@/css/jexcel.css';
	@import '@/css/jsuites.css';

</style>
