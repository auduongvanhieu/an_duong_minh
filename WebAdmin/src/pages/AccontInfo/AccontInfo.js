import classNames from 'classnames/bind'
import styles from './styles.scss'
import React, { useContext, useEffect, useRef, useState } from 'react'
import InputText from '../../components/Inputs/TextField'
import CustomDialog from '../../components/Confirm'

import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Modal,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faGear,
	faKey,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { API_URL, LOGIN_URL } from '../../configs'
import { WidgetContext } from '../../../src/context'
import axios from 'axios'
import { axiosApp, loginCheckWidthError } from '../../rest'
import { action } from '../../reducer'

const cx = classNames.bind(styles)

function AccontInfo({ children, row, onSave = (row, field, value) => {} }) {
	const {
		state: { currentUser },
		dispatch,
	} = useContext(WidgetContext)

	const [currentUserTemp, setCurrentUserTemp] = useState(currentUser)
	const [changePass, setchangePass] = useState({})
	useEffect(() => {
		setCurrentUserTemp(currentUser)
	}, [currentUser])
	const [disablee, setDisablee] = useState(true)
	const [modal, setModal] = useState(false)
	const [showMess, setshowMess] = useState(false)
	const [message, setmessage] = useState("")
	const [disable, setDisable] = useState(true)
	const [openModal, setOpenModal] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const fileRef = useRef()
	const handlesetSave = (fieldName, value) => {
		setCurrentUserTemp({ ...currentUserTemp, [fieldName]: value })
		setDisablee(false)
	}
	const handleChangePass=()=>{
		axiosApp
			.put(`/user/changepassword/${currentUser._id}`, changePass)
			.then(({data}) => {
				if(data.success){
					setmessage(data.message)
					setshowMess(true)
				}
			})
			.catch((e) => {
				let {response:{data}}=e
				if(data.message.length)setmessage(data.message[0])
				setshowMess(true)
				loginCheckWidthError(e)
			})
		
	}
	const handelSave = () => {
		axiosApp
			.put(`/user/${currentUser._id}`, currentUserTemp)
			.then((data) => {
				setDisable(true)
				dispatch({
					type: action.FETCH_CURRENT_USER_SUCCESS,
					payload: data.data.data,
				})
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})
	}
	const handeShowModalMess = (mess) => {
		setErrorMessage(mess)
		setOpenModal(true)
	}
	const handleModa = () => {
		setModal(true)
	}
	const handleClose = () => {
		setModal(false)
	}
	const handleOnchane = () => {
		setDisable(false)
	}
	const [logout, setlogout] = useState(false)
	const handleLogout = () => {
		localStorage.clear()
		window.location.reload()
	}

	const handleUploadImage = () => {
		fileRef.current.click()
	}
	const handleChaneFile = (e) => {
		if (!e.target.files[0]) {
			return
		} else if (!e.target.files[0].type.startsWith('image')) {
			handeShowModalMess('Định dạng file không dc hỗ trợ')
		} else {
			let a = new FormData()
			a.append('image', e.target.files[0])
			fetch(`${API_URL}/upload`, { method: 'POST', body: a })
				.then(async (data) => {
					let result = await data.json()
					console.log('res', result)
					if (!result.success) {
						handeShowModalMess('Lỗi upload file, thử lại sau...')
					} else {
						handlesetSave('avatar', result.data)
					}
				})
				.catch((error) => {
					handeShowModalMess('Lỗi upload file, thử lại sau...')
				})
		}
	}
	return (
		<>
			<Box className={cx('mainAccoun')}>
				<Box
					className={cx('headerBox')}
					style={{ width: '100%', display: 'flex' }}
				>
					<Box>
						<Typography
							className={cx('heading')}
							variant="h4"
							display="inline"
							style={{ paddingLeft: '1em' }}
						>
							TRANG CÁ NHÂN
						</Typography>
					</Box>
					<Box style={{ width: 0, flex: 'auto' }}></Box>
					{/* <Box>
            <Button className={cx("buttonDefault")} color="primary">
              <FontAwesomeIcon icon={faGear} />
              Setting
            </Button>
          </Box> */}
					<Box>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={() => {
								handleModa()
							}}
						>
							<FontAwesomeIcon icon={faKey} />
							Thay đổi mật khẩu
						</Button>
					</Box>

					<Box>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={() => handleLogout()}
						>
							<FontAwesomeIcon icon={faRightFromBracket} />
							Đăng xuất
						</Button>
					</Box>
				</Box>
				<Box className={'mainBox'}>
					<Typography className={cx('heardingInput')} variant="h8">
						Thông tin cá nhân
					</Typography>
					<Box className={cx('boxInput')}>
						<TextField
							disabled={true}
							className={cx('textinput')}
							margin="normal"
							size="small"
							id="outlined-basic"
							label="Tên đăng nhập"
							variant="outlined"
							onChange={({ target: { value } }) =>
								handlesetSave('username', value)
							}
							value={currentUserTemp?.username}
						/>
						<TextField
							className={cx('textinput')}
							margin="normal"
							size="small"
							id="outlined-basic"
							label="Email"
							variant="outlined"
							onChange={({ target: { value } }) =>
								handlesetSave('email', value)
							}
							value={currentUserTemp?.email}
						/>
					</Box>
					<Box className={cx('boxInputt')}>
						<TextField
							className={cx('textinput')}
							margin="normal"
							size="small"
							id="outlined-basic"
							label="Họ Tên"
							variant="outlined"
							onChange={({ target: { value } }) =>
								handlesetSave('fullname', value)
							}
							value={currentUserTemp?.fullname}
						/>{' '}
						<TextField
							className={cx('textinput')}
							margin="normal"
							size="small"
							id="outlined-basic"
							label="Điện thoại"
							variant="outlined"
							onChange={({ target: { value } }) =>
								handlesetSave('phoneNumber', value)
							}
							value={currentUserTemp?.phoneNumber}
						/>
					</Box>

					<Box className={cx('boxInputtt')}></Box>
					<Typography className={cx('heardingInput')} variant="h8">
						<Box>
							<label
								className={cx('avatarcss')}
								style={{
									textAlign: 'center',
									margin: '2em auto',
									display: 'block',
								}}
							>
								{currentUserTemp?.avatar ? (
									<img
										alt="avatar"
										src={currentUserTemp?.avatar}
										onClick={handleUploadImage}
										width="120"
										style={{
											borderRadius: 8,
										}}
									/>
								) : (
									<Button onClick={handleUploadImage}>
										upload avatar
									</Button>
								)}
							</label>
						</Box>
					</Typography>

					<Box>
						<Button
							onClick={() => handelSave()}
							disabled={disablee}
							className={cx('btnSave')}
							color="primary"
							variant="contained"
						>
							LƯU THAY ĐỔI
						</Button>
					</Box>
					<Modal
						open={modal}
						onClose={handleClose} // cái này là gán function handleClose vào prop onClose
						// còn onClose=handleClose() là gán result của handleClose vào prop onClose
						//thế thì theo anh cái nào đúng. chắc là cái gán func
						//trước gặp 1 lần rồi mà
						aria-labelledby="modal-modal-title"
						aria-describedby="modal-modal-description"
					>
						<Paper style={style}>
							<Typography variant="h5">
								Thay đổi mật khẩu
							</Typography>
							<Box>
								<InputText
									style={cssInput}
									className={cx('inputModal')}
									label={'Mật khẩu hiện tại'}
									onChange={({ target: { value } }) =>
									setchangePass({...changePass,currentPassword:value})
									}
								/>
								<InputText
									style={cssInput}
									className={cx('inputModal')}
									label={'Mật khẩu mới'}
									onChange={({ target: { value } }) =>
									setchangePass({...changePass,newPassword:value})
									}
								/>
								<InputText
									style={cssInput}
									className={cx('inputModal')}
									label={'Xác nhận mật khẩu mới'}
									onChange={({ target: { value } }) =>
									setchangePass({...changePass,confirmPassword:value}) 
									}
								/>
								<Button
									className={cx('btnModal')}
									color="primary"
									variant="contained"
									onClick={handleChangePass}
								>
									Lưu thay đổi
								</Button>
							</Box>
						</Paper>
					</Modal>
				</Box>
			</Box>
			<Modal
				open={openModal}
				onClose={() => setOpenModal(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Paper style={styleMD}>
					<Typography variant="h5">{errorMessage}</Typography>
				</Paper>
			</Modal>
			<input
				onChange={handleChaneFile}
				type={'file'}
				name={'image'}
				ref={fileRef}
				style={{ display: 'none' }}
			/>
			<CustomDialog
					  onClick={e => e.stopPropagation()}
					  styles={{ zIndex: 1000 }}
					  open={showMess}
					  onClose={() => setshowMess(false)}
					  text={message}
					  title={'Thông báo'}
					  buttons={[
						  <Button
							  onClick={e => {
								  e.stopPropagation()
								  setshowMess(false)
								  handleClose(false)
							  }}
						  >
							  OK
						  </Button>,
					  ]}
				  />
		</>
	)
}
export default AccontInfo
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	padding: 50,
}
const cssInput = {
	margin: '16px 0',
}
const styleMD = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	padding: 50,
}
