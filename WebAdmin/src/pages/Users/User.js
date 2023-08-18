//json full
// {
//     "deleted": false,
//     "_id": "62b1b06f3cfdc45fda05af67",
//     "fullname": "Nguyễn Admin",
//     "username": "admin",
//     "email": "thanhbinh.ltmt@gmail.com",
//     "phoneNumber": "0987654321",
//     "gender": "male",
//     "avatar": "/images/img-post-3.jpg",
//     "role": "admin",
//     "allow": true
//     }

//nhwxng cot cann lay ra
// {
//     "fullname": "Nguyễn Admin",
//     "username": "admin",
//     "email": "thanhbinh.ltmt@gmail.com",
//     "phoneNumber": "0987654321",
//     "gender": "male",
//     "avatar": "/images/img-post-3.jpg",
//     "role": "admin",
//     "allow": true
//     }

import classNames from 'classnames/bind'
import styles from './styles.scss'
import React, { useState, useEffect, useContext } from 'react'
import {
	Box,
	Button,
	Checkbox,
	Modal,
	Paper,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import InputText from '../../components/Inputs/TextField'
import { WidgetContext } from '../../context'
import { API_URL } from '../../configs'
import { axiosApp, loginCheckWidthError } from '../../rest'
import CustomDialog from '../../components/Confirm'
import { setAva } from '../../helpers'

const cx = classNames.bind(styles)
function createData(
	fullname,
	username,
	email,
	phoneNumber,
	gender,
	avatar,
	role,
	allow
) {
	return {
		fullname,
		username,
		email,
		phoneNumber,
		gender,
		avatar,
		role,
		allow,
	}
}
function User({ children }) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const {
		state: { users, handles },
	} = useContext(WidgetContext)

	useEffect(() => {
		handles.fetchUsers()
	}, [])
	useEffect(() => {
		setrows(users)
	}, [users])
	const [rows, setrows] = useState(users)
	const [open, setOpen] = useState(false)
	const [newUser, setNewUser] = useState({})
	const [disable, setDisable] = useState(true)
	const [listUser, setListUser] = useState([])

	const handleOpenUser = row => {
		console.log(row)
		setOpen(true)
	}

	const handleSetUser = (fieldName, value) => {
		setNewUser({ ...newUser, [fieldName]: value })
		setDisable(false)
	}
	const [openModal, setOpenModal] = useState(false)
	const handleOpen = () => {
		setOpenModal(true)
	}
	const handleClose = () => {
		setOpenModal(false)
	}
	const handeSave = () => {
		axiosApp
			.post(`/user`, newUser)
			.then(data => {
				handles.fetchUsers()
				setOpenModal(false)
			})
			.catch(e => {
				loginCheckWidthError(e)
			})
		// fetch(`${API_URL}/user`, {
		//     method: 'POST',
		//     headers: {
		//         'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify(newUser),
		// }).then(async (data) => {
		//     let result = await data.json();
		//     handles.fetchUsers();
		// });
	}
	const handdleDeleteSuccess = (ids = []) => {
		setrows([...rows.filter(f => !ids.includes(f._id))])
	}
	const handleDelete = () => {
		let itemsDelete = rows.filter(f => f.checked)
		let arrIdDelete = itemsDelete.map(f => f._id)
		axiosApp
			.delete(`/user`, { data: { users: arrIdDelete ?? [] } })
			.then(data => {
				handles.fetchUsers()
				setShowConfirmDelete(false)
			})
			.catch(e => {
				loginCheckWidthError(e)
			})
		// fetch(`${API_URL}/user`, {
		//     method: 'DELETE',
		//     headers: {
		//         'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify({ users: arrIdDelete ?? [] }),
		// }).then(async (data) => {
		//     let result = await data.json();
		//     if (result.success) {
		//         handdleDeleteSuccess(arrIdDelete ?? []);
		//     }
		// });
	}
	const handelDel = () => {
		console.log(rows)
	}
	const handleChecked = (row, value) => {
		row.checked = value
		setrows([...rows])

		console.log(row)
	}
	const handleCheckAll = value => {
		rows.forEach(f => (f.checked = value))
		console.log(rows)
		setrows([...rows])
	}

	const [showError,setshowError]=useState(false)
	const [messError,setmessError]=useState('')
	const handleAllowUser=(user,value)=>{
		console.log(user,value)
		axiosApp.get(`/user/set-allow?id=${user._id}&value=${value}`).then(e=>{
			console.log(e)
		user.allow=value
		setrows([...rows])
		}).catch(e=>{

			if(!e.response.data.success){
				setmessError(e.response.data.message)
				setshowError(true)
			  }
			  loginCheckWidthError(e);
		})
	}
	return (
		<>
			<Box className={cx('mainUserBox')}>
				<Box
					className={cx('headerBox')}
					style={{ width: '100%', display: 'flex' }}
				>
					<Box>
						<Typography variant="h6" display="inline">
							NGƯỜI DÙNG
						</Typography>
					</Box>
					<Box style={{ width: 0, flex: 'auto' }}></Box>
					<Box>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={handleOpen}
						>
							<FontAwesomeIcon icon={faAdd} />
							THÊM
						</Button>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={() => setShowConfirmDelete(true)}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
							XÓA
						</Button>
					</Box>
				</Box>
				<Box className={cx('mainBox')}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<Checkbox
											onChange={(_, value) =>
												handleCheckAll(value)
											}
										></Checkbox>
									</TableCell>
									<TableCell>Họ tên</TableCell>
									<TableCell align="center">
										Tên đăng nhập
									</TableCell>
									<TableCell align="center">Email</TableCell>
									<TableCell align="center">
										Điện thoại
									</TableCell>
									<TableCell align="center">
										Giới tính
									</TableCell>
									<TableCell align="center">Avatar</TableCell>
									<TableCell align="center">Quyền</TableCell>
									<TableCell align="center">Trạng thái</TableCell>
									{/* <TableCell align="center">Active</TableCell> */}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((
									user, //fullname,username, email, phoneNumber, gender, avatar,role,allow
									index
								) => (
									<TableRow
										// onClick={() => handleOpenUser(row)}
										// hover={true}
										key={index}
										style={{ cursor: 'pointer' }}
										sx={{
											'&:last-child td, &:last-child th': {
												border: 0,
											},
										}}
									>
										<TableCell align="center">
											<Checkbox
												checked={user.checked ?? false}
												onChange={(event, value) =>
													handleChecked(user, value)
												}
											/>
										</TableCell>
										<TableCell component="th" scope="row">
											{user.fullname}
										</TableCell>
										<TableCell align="left">
											{user.username}
										</TableCell>
										<TableCell align="center">
											{user.email}
											{/* <Switch
                                                    size="small"
                                                    disable
                                                    // checked={row.isActive}
                                                /> */}
										</TableCell>
										<TableCell align="right">
											{user.phoneNumber}
										</TableCell>
										<TableCell align="right">
											{user.gender}
										</TableCell>
										<TableCell align="right">
											<p className="avatar__user">
												{user.avatar && (
													<img src={user.avatar} />
												)}
												{!user.avatar && (
													<span className="avatar__name">
														{user.fullname
															? setAva(
																	user.fullname
															  )
															: setAva(
																	user.username
															  )}
													</span>
												)}
											</p>
										</TableCell>
										<TableCell align="center">
											{user.role}
										</TableCell>
										<TableCell align="center">
												<Switch
													size="small"
													disable
													checked={user.allow}
													onChange={(_,value)=>handleAllowUser(user,value)}
												/>
											</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>

			<Modal
				open={openModal}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Paper style={style}>
					<Typography variant="h5">Thêm người dùng</Typography>
					<Box>
						<InputText
							style={cssmodal}
							label={'fullname'}
							onChange={({ target: { value } }) =>
								handleSetUser('fullname', value)
							}
						/>
						<InputText
							style={cssmodal}
							label={'user name'}
							onChange={({ target: { value } }) =>
								handleSetUser('username', value)
							}
						/>
						<InputText
							style={cssmodal}
							label={'Email'}
							onChange={({ target: { value } }) =>
								handleSetUser('email', value)
							}
						/>
						<InputText
							style={cssmodal}
							label={'Phonenumber'}
							onChange={({ target: { value } }) =>
								handleSetUser('phoneNumber', value)
							}
						/>
						<InputText
							style={cssmodal}
							label={'Gender'}
							onChange={({ target: { value } }) =>
								handleSetUser('gender', value)
							}
						/>
						<InputText
							style={cssmodal}
							label={'pass word'}
							onChange={({ target: { value } }) =>
								handleSetUser('password', value)
							}
						/>

						<Button
							disabled={disable}
							color="primary"
							variant="contained"
							onClick={handeSave}
						>
							Lưu
						</Button>
					</Box>
				</Paper>
			</Modal>

			<CustomDialog
				onClick={e => e.stopPropagation()}
				styles={{ zIndex: 1000 }}
				open={showConfirmDelete}
				onClose={() => setShowConfirmDelete(false)}
				text="Bạn chắc chắn muốn xóa người dùng?"
				title={'Xác nhận? '}
				buttons={[
					<Button
						onClick={e => {
							e.stopPropagation()
							setShowConfirmDelete(false)
						}}
					>
						Hủy
					</Button>,
					<Button onClick={handleDelete}>Xóa</Button>,
				]}
			/>
      <CustomDialog
        onClick={(e) => e.stopPropagation()}
        styles={{ zIndex: 1000 }}
        open={showError}
        onClose={() => setshowError(false)}
        text={messError}
        title={"Error "}
        buttons={[
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setshowError(false);
            }}
          >
            OK
          </Button>,
        ]}
      />
		</>
	)
}
export default User
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
const cssmodal = {
	margin: '16px 0',
}
