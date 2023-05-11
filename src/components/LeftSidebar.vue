<template>
	<q-drawer
		 :model-value="isOpen"
		 show-if-above
		 bordered
		 side="left"
		 class="bg-grey-2"
		 :width="300"
	>
		<q-scroll-area class="fit">
			<q-list padding>
				<q-item v-ripple clickable>
					<q-item-section avatar>
						<q-icon color="grey" name="api"/>
					</q-item-section>
					<q-item-section>
						<a :href="`http://${VITE_api_server_name}`" target="_blank">OpenAPI backend</a>
					</q-item-section>
				</q-item>

				<q-item v-ripple clickable>
					<q-item-section avatar>
						<q-icon color="grey" name="account_circle"/>
					</q-item-section>
					<q-item-section>
						<a :href="`http://${VITE_api_server_name}`" target="_blank">Admin panel</a>
					</q-item-section>
				</q-item>

				<q-separator class="q-my-md"/>

				<router-link v-for="link in state.links" :key="link.text" :to="{name: link.path}">
					<q-item v-ripple clickable>
						<q-item-section avatar>
							<q-icon color="grey" :name="link.icon"/>
						</q-item-section>
						<q-item-section>
							{{ link.text }}
						</q-item-section>
					</q-item>
				</router-link>
			</q-list>
		</q-scroll-area>
	</q-drawer>
</template>

<script setup>
	import { reactive} from 'vue'
	import {useStore} from 'vuex'

	const { VITE_api_server_name } = import.meta.env

	let store = useStore()
	let props = defineProps({
		isOpen: {
			type: Boolean,
			default: false
		}
	})

	const state = reactive({
		links: [
			{ icon: 'home', text: 'Домой', path: 'home' },
			{ icon: 'summarize', text: 'Отчеты', path: 'reports' },
			{ icon: 'input', text: 'Ввод данных', path: 'input-data' },
		],
	})

</script>
