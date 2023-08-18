import {
	faArrowRightFromBracket,
	faEarthAsia,
	faGear,
	faKeyboard,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { BarsIcon, Database, PenToSquare, SettingIcon } from '../../Icons'
// import Button from '../../Button';
import styles from './Header.module.scss'
import Image from '../../../../src/components/Image'
import Menus from '../../Popper/Menu'
import { Link } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import { useContext } from 'react'
import { WidgetContext } from '../../../context'
import { setAva } from '../../../helpers'
const cx = classNames.bind(styles)
// const MENU_ITEMS = [

//     {
//         icon: <FontAwesomeIcon icon={faEarthAsia} />,
//         title: 'English',
//         children: {
//             title: 'language',
//             data: [
//                 {
//                     type: 'language',
//                     code: 'EN',
//                     title: 'english',
//                 },
//                 {
//                     type: 'language',
//                     code: 'VI',
//                     title: 'tiếng việt',
//                 },
//             ],
//         },
//     },

//     {
//         icon: <FontAwesomeIcon icon={faKeyboard} />,
//         title: 'Keyboard shortcust',
//     },
// ];
function Header() {
	const {
		state: { currentUser },
	} = useContext(WidgetContext)
	const curenUser = true
	const handleMenuChange = (menuItem) => {
		switch (menuItem.type) {
			case 'viewprofile':
				break
			default:
		}
	}
	const userMenu = [
		{
			icon: <FontAwesomeIcon icon={faUser} />,
			title: 'view profile',
			to: '/my-account',
		},

		// {
		//     icon: <FontAwesomeIcon icon={faGear} />,
		//     title: 'setting',
		//     to: '/setting',
		// },
		// ...MENU_ITEMS,
		{
			icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
			title: 'Log out',
			to: '/setting',
			separate: true,
		},
	]
	// const [show,setShow]=useState(false)
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inerleft')}>
				<div className={cx('logo')}>
					<Link to={'./'}>
						<img alt="logo" src={logo} />
					</Link>
					<Tippy delay={[0, 200]} content="Menu" placement="bottom">
						{/* <button className={cx('actions-btn')}>
                            <BarsIcon />
                        </button> */}
					</Tippy>
					{/* <Button text>
                    <BarsIcon/>
                </Button> */}
				</div>
			</div>
			<div className={cx('actions')}>
				{/* <>
					<Tippy
						delay={[0, 200]}
						content="thống kê"
						placement="bottom"
					>
						<button className={cx('actions-btn')}>
							<Database />
						</button>
					</Tippy>

					<Tippy
						delay={[0, 200]}
						content="viết bài"
						placement="bottom"
					>
						<button className={cx('actions-btn')}>
							<PenToSquare />
						</button>
					</Tippy>
					<Tippy
						delay={[0, 200]}
						content="cài đặt"
						placement="bottom"
					>
						<button className={cx('actions-btn')}>
							<SettingIcon />
						</button>
					</Tippy>
				</> */}
			</div>
			<div className={cx('avatarAdmin')}>
				<span className={cx('tileAdmin')}>
					xin chào
					<br />
					<b>{currentUser?.fullname}</b>
				</span>
				<Link to={'/my-account'}>
					<p className={cx('avatar__user-header')}>
						{currentUser?.avatar && (
							<img src={currentUser.avatar} />
						)}
						{!currentUser?.avatar && (
							<span className={cx('avatar__name-header')}>
								{currentUser?.fullname
									? setAva(currentUser.fullname)
									: setAva(currentUser?.username)}
							</span>
						)}
					</p>
					{/* <Image
						src={currentUser?.avatar}
						className={cx('user-avatar')}
						alt="admin"
						fallback="https://static.tin.moi/uploads/news/photo/bJ/bJb/bJbpeKuMYU-620x775.jpg"
					/> */}
				</Link>
				{/* 
            <button className={cx('more-btn')}>
                <FontAwesomeIcon icon={faCaretDown} />
            </button> */}
			</div>
		</div>
	)
}
export default Header
