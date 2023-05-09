<template>
	<div v-if="form" class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
		<div class="column q-pa-lg">
			<div class="row">
				<q-card square class="shadow-24" style="width:400px;height:450px;">
					<q-card-section class="bg-deep-purple-7">
						<h4 class="text-h5 text-white q-my-md">Авторизация</h4>
					</q-card-section>
					<q-card-section>
						<q-form class="q-px-sm q-pt-xl" @submit="submit">
							<q-input
								 ref="username"
								 v-model="state.username"
								 square
								 clearable
								 lazy-rules
								 :rules="[required]"
								 type="username" label="Пользователь"
							>
								<template #prepend>
									<q-icon name="person"/>
								</template>
							</q-input>
							<q-input
								 ref="password"
								 v-model="state.password"
								 square
								 clearable :type="state.passwordFieldType"
								 lazy-rules
								 :rules="[required,short]"
								 label="Пароль"
							>
								<template #prepend>
									<q-icon name="lock"/>
								</template>
								<template #append>
									<q-icon
										 :name="state.visibilityIcon" class="cursor-pointer"
										 @click="switchVisibility"
									/>
								</template>
							</q-input>

							<q-btn
								 type="submit"
								 unelevated
								 size="lg"
								 color="secondary"
								 class="full-width text-white q-mt-lg"
								 label="Вход"
							/>

						</q-form>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</div>
</template>

<!--https://codepen.io/greyufo/pen/eYZejPz-->

<script setup>
	import {ref, reactive, onMounted} from 'vue'
	import {LocalStorage, useQuasar} from 'quasar'

	const $q = useQuasar()
	import {useRouter, useRoute} from 'vue-router'

	import {setTitle} from '@/middleware'
	import {Transport} from '@/store/lib'

	let router = useRouter()
	let route = useRoute()

	const {
		VITE_username: usernameDefault,
		VITE_password: passwordDefault,
	} = import.meta.env

	const { VITE_token_name } = import.meta.env
	// console.log(VITE_token_name)

	const state = reactive({
		username: usernameDefault,
		password: passwordDefault,
		passwordFieldType: 'password',
		visibility: false,
		visibilityIcon: 'visibility',
	})

	setTitle(`Вход`)

	let required = (val) => (val && val.length > 0 || 'Поле должно быть заполнено')
	let short = (val) => (val && val.length > 2 || 'Значение слишком короткое')

	let username = ref(0)
	let password = ref(0)
	let form = ref(false)

	let submit = async () => {
		password.value.validate()
		if (password.value.hasError) {
			console.warn('в пароле есть ошибки (')
			return
		}

		let transport = new Transport()
		let cred = {
			username: state.username,
			password: state.password,
		}
		const options = {
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
		}
		let req = await transport.post('/auth/token-obtain', cred, options)
		let resp = req.data
		// console.log(resp)
		$q.localStorage.set(String(VITE_token_name), resp)
		transport.authorize()
		resp = await transport.get('me')
		// console.log(route.query.from)
		$q.localStorage.set('user', resp.data)
		console.log(LocalStorage.getItem('user'))
		// order important !!!
		await router.replace({ path: String(route.query.from) })

	}
	let switchVisibility = () => {
		state.visibility = !state.visibility
		state.passwordFieldType = state.visibility ? 'text' : 'password'
		state.visibilityIcon = state.visibility ? 'visibility_off' : 'visibility'
	}

	onMounted(async () => {
		form.value = true
	})

</script>
