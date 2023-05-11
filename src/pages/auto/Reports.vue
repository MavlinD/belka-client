<template>
	<layout>
		<q-page class="q-px-lg">
			<h2 class="q-ml-xl text-primary">Отчеты</h2>
			<q-form class="q-px-sm q-pt-xl">

				<p class="q-ml-xl q-mt-md text-primary">Список периодов формируется на основе введенных
					данных.</p>
				<q-select v-model="dataPeriod" :options="store.state.periodOptions"
							 label="Период регистрации"/>

				<q-btn
					 unelevated
					 size="lg"
					 color="secondary"
					 class=" text-white q-mt-lg"
					 label="Отчет"
					 @click="getReport"
				/>

			</q-form>

			<p class="q-ml-xl q-mt-md text-primary">Данные выводятся для текущего пользователя.</p>

			<div class="q-pa-md">
				<q-table
					 flat bordered
					 :rows="store.state.indicatorsData.items"
					 :columns="columns"
					 row-key="name"
					 color="amber"
					 v-model:pagination="pagination"
				/>
			</div>

		</q-page>
	</layout>
</template>

<script setup>

	import Layout from '@/layouts/default.vue'
	import {setTitle} from '@/middleware'
	import { onMounted, ref} from 'vue'
	import {Transport} from '@/store/lib'
	import moment from 'moment'
	import {useStore} from 'vuex'

	setTitle(`Отчеты`)
	let store = useStore()

	const pagination = ref({
		sortBy: 'desc',
		descending: false,
		page: 1,
		rowsPerPage: 30
	})

	const columns = [
		{
			name: 'name',
			required: true,
			label: 'Показатель',
			align: 'left',
			field: row => row.indicator_name,
			sortable: true
		},
		{
			name: 'min',
			required: true,
			label: 'Минимум',
			align: 'left',
			field: row => row.min,
			sortable: true
		},
		{
			name: 'avg',
			required: true,
			label: 'Среднее',
			align: 'left',
			field: row => row.avg,
			sortable: true
		},
		{
			name: 'max',
			required: true,
			label: 'Максимум',
			align: 'left',
			field: row => row.max,
			sortable: true
		},
	]

	let dataPeriod = ref(null)

	onMounted(async () => {
		await store.dispatch('getPeriods')
	})

	const getDateTime = (arg) => {
		return moment(arg, 'YYYY-MM-DD[T]hh:mm')
	}

	const transport = new Transport()
	transport.authorize()

	const getReport = async () => {

		let dt = getDateTime(dataPeriod.value?.value)
		let dtFormat = 'YYYY-MM-DD hh:mm'
		let date__gte = dt.startOf('month').format(dtFormat)
		let date__lte = dt.endOf('month').format(dtFormat)

		let params = new URLSearchParams()
		if (dt.isValid()) {
			params.append('date__gte', date__gte)
			params.append('date__lte', date__lte)
		}
		let request = {
			params: params
		}
		await store.dispatch('getIndicatorsData', request)
	}


</script>
