<template>
	<q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
		<q-toolbar>
			<q-btn
				v-if="leftSidebar"
				flat
				dense
				round
				aria-label="Menu"
				icon="menu"
				@click="$emit('toggle-left')"
			/>
			<router-link :to="{name:'home'}" class="text-decoration-none">
				<q-btn v-if="$q.screen.gt.xs" flat no-caps no-wrap class="q-ml-xs">
					<q-icon name="star_rate" color="grey" size="28px" />
					<q-toolbar-title shrink class="text-weight-bold text-grey">
						{{VITE_app_name}}
					</q-toolbar-title>
				</q-btn>
			</router-link>
			<q-space />
			<q-space />

			<q-space />
			<q-space />
			<q-space />
			<div class="q-gutter-sm row items-center no-wrap">
				<q-btn dense flat no-wrap>
					<q-avatar rounded size="25px">
						<img src="https://cdn.quasar.dev/img/boy-avatar.png">
					</q-avatar>
					<q-icon name="arrow_drop_down" size="20px" />
					<q-menu auto-close>
						<q-list v-if="user?.username" dense>
							<q-item class="GL__menu-link-signed-in">
								<q-item-section>
									<div>Опознан как <strong>{{ user?.username }}</strong></div>
								</q-item-section>
							</q-item>
							<q-separator />
							<q-item clickable class="GL__menu-link" @click="logout">
								Выйти
							</q-item>
						</q-list>
						<q-list v-else dense>
							<q-item clickable class="GL__menu-link">
								<router-link :to="{name:'login'}">Войти</router-link>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</div>
		</q-toolbar>
	</q-header>
</template>

<script setup>
	import {computed} from 'vue'
	import {useStore} from 'vuex'
	import {logout} from '@/components/basis'
	import {useQuasar} from 'quasar'

	const { VITE_app_name } = import.meta.env
	const $q = useQuasar()

	let store=useStore()

	defineProps({
		leftSidebar: {
			type: Boolean,
			default: true
		},
		rightSidebar: {
			type: Boolean,
			default: true
		}
	})

	const user = computed({
		get: () => $q.localStorage.getItem('user'),
	})

</script>
