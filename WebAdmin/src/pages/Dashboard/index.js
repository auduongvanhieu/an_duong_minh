import React, { useEffect, useState } from 'react'
import DashboardItem from './components/DashboardItem'
import Topvideo from './components/Topvideo'
import './dashboard.scss'
import { faEye, faUsers, faPhotoFilm } from '@fortawesome/free-solid-svg-icons'
import { axiosApp } from '../../rest'

const Dashboard = () => {
	const [countViews, setCountViews] = useState(0),
		[countUsers, setCountUsers] = useState(0),
		[countVideos, setCountVideo] = useState(0),
		[dataTopVideo, setDataTopVideo] = useState([])

	useEffect(() => {
		async function init() {
			let users = await axiosApp.get(`/user/list`)
			if (users.data.success) setCountUsers(users.data.data.length)
			let videos = await axiosApp.get(`/video/list`)
			if (videos.data.success) {
				setCountVideo(videos.data.data.length)
				let videosList = videos.data.data
				setCountViews(
					videosList.reduce(
						(totalView, video) => (totalView += +video.views),
						0
					)
				)
			}
			let topVideos = await axiosApp.get(`/video/list?top`)
			if (topVideos.data.success) setDataTopVideo(topVideos.data.data)
		}
		init()
	}, [])
	return (
		<>
			<div className="dash__container">
				<DashboardItem
					stat={countViews}
					title="Tổng lượt xem"
					icon={faEye}
				/>
				<DashboardItem
					stat={countUsers}
					title="Thành viên"
					icon={faUsers}
				/>
				<DashboardItem
					stat={countVideos}
					title="Video"
					icon={faPhotoFilm}
				/>
			</div>
			<Topvideo data={dataTopVideo} />
		</>
	)
}

export default Dashboard
