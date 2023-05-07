<template>
	<layout>
		<q-page class="q-px-lg">
			<h2 class="q-ml-xl text-primary">Ввод данных</h2>
			<!--			<article-list :list="store.state?.articles?.items" />-->
			<div id="spreadsheet"></div>
		</q-page>
	</layout>
</template>

<script setup>

	import Layout from '@/layouts/default.vue'
	import {useStore} from 'vuex'
	import {setTitle} from '@/middleware'
	import {onMounted} from 'vue'
	import jspreadsheet from 'jspreadsheet-ce'

	const store = useStore()
	const options = {
		data: [[]],
		minDimensions: [10, 10],
	}
	const el = 'spreadsheet'
	setTitle(`Ввод данных`)

	onMounted(async () => {

		let spreadsheet = jspreadsheet(document.getElementById(el), options)

	})
</script>
<style lang="scss">

	@import '@/css/jexcel.css';
	//@import 'src/css/jsuites.css';

</style>
