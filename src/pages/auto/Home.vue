<template>
	<layout>
		<q-page class="q-pa-lg">
			<h2 class="text-primary q-pl-lg">Домашняя страница</h2>
			<div id="spreadsheet4"></div>
		</q-page>
	</layout>
</template>

<script setup>
	import {setTitle} from '@/middleware'
	import Layout from '@/layouts/default.vue'
	import {onMounted} from 'vue'

	setTitle('Начало')

	onMounted(async()=>{
		// jexcel.fromSpreadsheet('https://bossanova.uk/jspreadsheet/v4/list.xlsx', function(result) {
		//     if (! result.length) {
		//         console.error('jspreadsheet: Something went wrong.');
		//     } else {
		//         if (result.length == 1) {
		//             jspreadsheet(document.getElementById('spreadsheet4'), result[0]);
		//         } else {
		//             jexcel.createTabs(document.getElementById('spreadsheet4'), result);
		//         }
		//     }
		// });
	})

</script>
