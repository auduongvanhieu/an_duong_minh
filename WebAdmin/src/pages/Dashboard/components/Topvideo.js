import React from 'react'
import { timeConvert } from '../../../helpers'

const Topvideo = ({ data }) => {
	return (
		<div className="topvideo">
			<h1 className="topvideo__title">
				Top 10 video nhiều lượt xem nhất
			</h1>
			<table className="topvideo__table">
				<thead>
					<tr>
						<th></th>
						<th>Tiêu đề</th>
						<th>Mô tả</th>
						<th>Đã tạo</th>
						<th>Lượt xem</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr key={item._id}>
							<td>
								<p className="topvideo__img">
									<img
										src={
											item?.parts[0]?.thumbnail ||
											'http://api-spro.tb-web.site/uploads/1657079202853-default.png'
										}
									/>
								</p>
							</td>
							<td>{item.title}</td>
							<td>{item.remark}</td>
							<td>{timeConvert(new Date(item?.createdAt))}</td>
							<td>{item.views}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Topvideo
