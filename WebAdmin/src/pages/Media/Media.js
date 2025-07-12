import { faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Checkbox, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react'
import images from '../../../src/assets/images'
import CustomDialog from '../../components/Confirm'
import { API_URL } from '../../configs'
import { timeConvert } from '../../helpers'
import { axiosApp, loginCheckWidthError } from '../../rest'
import Loading from '../Loading'
import styles from './styles.scss'

const cx = classNames.bind(styles)

function Media({ children }) {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [rows, setrows] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getlist()
	}, [])

	const getlist = useCallback(() => {
		axiosApp
			.get(`/media/list`)
			.then((data) => {
				setrows(data.data.data)
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})
	}, [])

	const handleDelete = () => {
		let itemsDelete = rows.filter(f => f.checked)
		let arrIdDelete = itemsDelete.map(f => f._id)
		setLoading(true)
		axiosApp
			.post(`/media/deletes`, { ids: arrIdDelete })
			.then(data => {
				getlist()
				setShowConfirmDelete(false)
				setLoading(false)
			})
			.catch(e => {
				loginCheckWidthError(e)
				setLoading(false)
			})
	}

	const handleChecked = (row, value) => {
		row.checked = value
		setrows([...rows])
	}

	const handleCheckAll = value => {
		rows.forEach(f => (f.checked = value))
		setrows([...rows])
	}

	const [openModalUpload, setOpenModalUpload] = useState(false)
	const handleOpen = () => {
		setOpenModalUpload(true)
	}
	const handleCloseUpload = () => {
		setOpenModalUpload(false)
	}
	const [fileUpload, setFileUpload] = useState(null)
	const handeSaveUpload = () => {
		setLoading(true)
		let a = new FormData()
		a.append('image', fileUpload)
		fetch(`${API_URL}/upload`, { method: 'POST', body: a })
			.then(async (data) => {
				let result = await data.json()
				if (!result.success) {
					handeShowModalMess('Lỗi upload file 1: ' + result.message)
				} else {
					getlist()
					setOpenModalUpload(false)
				}
				setLoading(false)
			})
			.catch((error) => {
				handeShowModalMess('Lỗi upload file 2: ' + error.message)
				setLoading(false)
			})
	}

	const [errorMessage, setErrorMessage] = useState('')
	const handeShowModalMess = (mess) => {
		setOpenModalUpload(false)
		setErrorMessage(mess)
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
							Danh sách tài nguyên
						</Typography>
					</Box>
					<Box style={{ width: 0, flex: 'auto' }}></Box>
					<Box>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={handleOpen}
						>
							<FontAwesomeIcon icon={faUpload} style={{ marginRight: 2 }} />
							Tải lên
						</Button>
						<Button
							className={cx('buttonDefault')}
							color="primary"
							onClick={() => setShowConfirmDelete(true)}
						>
							<FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: 2 }} />
							XÓA
						</Button>
					</Box>
				</Box>
				<Box className={cx('mainBox')}>
					<TableContainer component={Paper} style={{ maxHeight: 'calc(100vh - 150px)' }}>
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
									<TableCell align="center">
										Thumbnail
									</TableCell>
									<TableCell align="center">
										Tên file
									</TableCell>
									<TableCell align="center">
										Dung lượng
									</TableCell>
									<TableCell align="center">
										Url
									</TableCell>
									<TableCell align="center">
										Hiện hữu
									</TableCell>
									<TableCell align="center">
										Ngày tạo
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((
									media,
									index
								) => (
									<TableRow
										key={index}
										style={{ cursor: 'pointer' }}
										sx={{ '&:last-child td, &:last-child th': { border: 0, }, }}
									>
										<TableCell align="center">
											<Checkbox
												checked={media.checked ?? false}
												onChange={(event, value) =>
													handleChecked(media, value)
												}
											/>
										</TableCell>
										<TableCell align="center">
											<img src={media.contentType.includes('image') ? media.url : images.video} style={{ width: '100px', height: '100px' }} />
										</TableCell>
										<TableCell component="th" scope="row">
											{media.fileName}
										</TableCell>
										<TableCell align="center">
											{(media.size / 1024 / 1024).toFixed(2)} MB
										</TableCell>
										<TableCell align="right">
											<a href={media.url} target="_blank" rel="noopener noreferrer">{media.url.slice(0, 8)}...{media.url.slice(-10)}</a>
										</TableCell>
										<TableCell align="right">
											{media.exist ? 'Có' : 'Không'}
										</TableCell>
										<TableCell align="center">
											{timeConvert(new Date(media.createdAt))}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			{loading && <Loading />}

			<Modal
				open={openModalUpload}
				onClose={handleCloseUpload}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Paper style={styleModalUpload}>
					<Typography variant="h5">Tải lên file</Typography>
					<Typography variant="h7">(Tối đa 50MB)</Typography>
					<Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
						<input type='file' onChange={(e) => setFileUpload(e.target.files[0])} />
						<Button color="primary" variant="contained" onClick={handeSaveUpload} style={{ marginTop: 10 }}> Lưu </Button>
					</Box>
				</Paper>
			</Modal>

			<CustomDialog
				key={"delete-media"}
				onClick={e => e.stopPropagation()}
				styles={{ zIndex: 1000 }}
				open={showConfirmDelete}
				onClose={() => setShowConfirmDelete(false)}
				text="Bạn chắc chắn muốn xóa tài nguyên đã chọn?"
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

			<Modal
				open={errorMessage !== ''}
				onClose={() => setErrorMessage('')}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Paper style={styleModalUpload}>
					<Typography variant="h5">{errorMessage}</Typography>
				</Paper>
			</Modal>
		</>
	)
}

export default Media

const styleModalUpload = {
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
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}
const cssModalUpload = {
	margin: '16px 0',
}