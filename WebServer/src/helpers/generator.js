const genCode = (length) => {
	let result = ''
	let characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz@#$'
	let charactersLength = characters.length
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
	}
	return result
}

const genTime = (offset) => {
	let d = new Date()
	let t = new Date(d + 15 * 60000)
	let utc = t.getTime() + t.getTimezoneOffset() * 60000
	let nd = new Date(utc + 3600000 * offset)
	return nd
}

module.exports = {
	genCode,
	genTime,
}
