import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DashboardItem = ({ stat, title, icon }) => {
	return (
		<div className="dash__item">
			<div className="dash__item-inner">
				<FontAwesomeIcon className="dash__item-icon" icon={icon} />
				<p className="dash__item-stat">{stat}</p>
				<p className="dash__item-title">{title}</p>
			</div>
		</div>
	)
}

export default DashboardItem
