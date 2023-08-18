import { faHouseChimney } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'
import MenuItem from './Menulist'
import Styles from './Sidebar.module.scss'
import { Link } from 'react-router-dom'

const cx = classNames.bind(Styles)

function Sidebar() {
	return (
		<div className={cx('wrapper')}>
			<Link to={'./'}>
				<div className={cx('dashboard')}>
					<FontAwesomeIcon
						className={cx('icon')}
						icon={faHouseChimney}
					/>
					<h4 className={cx('title')}>Bảng Điều Khiển</h4>
				</div>
			</Link>
			<MenuItem />

			{/* <SubMenuList/> */}
		</div>
	)
}
export default Sidebar
