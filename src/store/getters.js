export const indicatorsData = (store) => () => {
	let ret = store.state.indicatorsData
	console.log(ret)
	return ret
	// return store.state.periodOptions[0]
	// let arr =[]
	// category.ancestors?.forEach(el=>{
	// 	arr.push(el)
	// })
	// arr.push(category)
	// return arr
}
