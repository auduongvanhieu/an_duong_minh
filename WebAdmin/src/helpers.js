export const timeConvert = (date) => {
	let seconds = Math.floor((new Date() - date) / 1000),
		interval = seconds / 31536000
	if (interval > 1) return Math.floor(interval) + ' năm trước'
	interval = seconds / 2592000
	if (interval > 1) return Math.floor(interval) + ' tháng trước'
	interval = seconds / 86400
	if (interval > 1) return Math.floor(interval) + ' ngày trước'
	interval = seconds / 3600
	if (interval > 1) return Math.floor(interval) + ' giờ trước'
	interval = seconds / 60
	if (interval > 1) return Math.floor(interval) + ' phút trước'
	return Math.floor(seconds) + ' giây trước'
}

export const setAva = (str) =>
	str
		? str
				.split(' ')
				.map((text) => text[0])
				.join('')
				.toUpperCase()
				.substring(0, 2)
		: ''
