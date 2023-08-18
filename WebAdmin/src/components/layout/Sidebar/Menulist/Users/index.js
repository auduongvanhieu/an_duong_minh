import classNames from 'classnames/bind'
import styles from './Users.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { WidgetContext } from '../../../../../context'

const cx = classNames.bind(styles)

function Users() {
	const {
		state: { users, currentUser },
	} = useContext(WidgetContext)

	return (
		<>
			{currentUser?.role === 'admin' && (
				<div className={cx('item')}>
					<Link to={'/user'}>
						<FontAwesomeIcon className={cx('icon')} icon={faUser} />
						<span className={cx('text')}>Người dùng</span>
						{/* <FontAwesomeIcon
                    className={cx('icondown')}
                    icon={faAngleDown}
                /> */}
					</Link>
				</div>
			)}
		</>
	)
}

export default Users
