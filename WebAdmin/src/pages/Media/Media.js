import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react'
import images from '../../../src/assets/images'
import CustomDialog from '../../components/Confirm'
import { timeConvert } from '../../helpers'
import { axiosApp, loginCheckWidthError } from '../../rest'
import styles from './styles.scss'
import Loading from '../Loading'

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

	return (
		<>
			<Box className={cx('mainMediaBox')}>
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
			<CustomDialog
				key={"delete-media"}
				onClick={e => e.stopPropagation()}
				styles={{ zIndex: 1000 }}
				open={showConfirmDelete}
				onClose={() => setShowConfirmDelete(false)}
				text="Bạn chắc chắn muốn xóa tài nguyên?"
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
		</>
	)
}

export default Media
