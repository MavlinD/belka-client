<template>
	<q-layout view="hhh lpr fff" class="bg-grey-1">
		<slot name="header">
			<Header @toggle-left="toggleLeftDrawer" @toggle-right="toggleRightDrawer"/>
		</slot>
		<slot name="leftSidebar">
			<left-sidebar :is-open="state.leftDrawerOpen"/>
		</slot>
		<q-page-container>
			<q-page class="q-pt-sm">
				<slot/>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup>

	import {reactive} from 'vue'
	import Header from '@/components/Header.vue'
	import LeftSidebar from '@/components/LeftSidebar.vue'

	const state = reactive({
		rightDrawerOpen: true,
		leftDrawerOpen: true,
	})

	function toggleLeftDrawer() {
		state.leftDrawerOpen = !state.leftDrawerOpen
	}

	function toggleRightDrawer() {
		state.rightDrawerOpen = !state.rightDrawerOpen
	}

</script>

<style lang="scss">
	.q-layout {
		margin: 0 auto;
	}

	body.screen--xl {
		.q-layout {
			width: 70%;
		}
	}

	body.screen--lg {
		.q-layout {
			width: 80%;
		}
	}

	.YL {
		&__toolbar-input-container {
			min-width: 100px;
			width: 55%;
		}

		&__toolbar-input-btn {
			border-radius: 0;
			border-style: solid;
			border-width: 1px 1px 1px 0;
			border-color: rgba(0, 0, 0, .24);
			max-width: 60px;
			width: 100%
		}

		&__drawer-footer-link {
			color: inherit;
			text-decoration: none;
			font-weight: 500;
			font-size: .75rem;

			&:hover {
				color: #000
			}
		}
	}

	.text-decoration-none {
		text-decoration: none;
	}

	a{
		text-decoration: none;
	}

</style>
