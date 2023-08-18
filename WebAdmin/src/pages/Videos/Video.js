import classNames from 'classnames/bind'
import styles from './styles.scss'
import {
	Box,
	Typography,
	Button,
	Switch,
	Checkbox,
	Backdrop,
	Dialog,
	DialogActions,
	DialogContentText,
	DialogContent,
	DialogTitle,
} from '@material-ui/core'
import { faTrashAlt, faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DetailVideo from './components/Detail'
import { useCallback, useContext, useEffect, useState } from 'react'
import { API_URL } from '../../configs'
import Loading from '../Loading'
import { WidgetContext } from '../../context'
import { axiosApp, loginCheckWidthError } from '../../rest'
import { timeConvert } from '../../helpers'
import { SearchBox } from './components/SearchBox'

const cx = classNames.bind(styles)

const Videos = ({ children }) => {
	const {
		state: { users, currentUser },
	} = useContext(WidgetContext)
	const [open, setOpen] = useState(false)
	const [openCConfimDelete, setopenCConfimDelete] = useState(false)
	const [rows, setrows] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [detailVideo, setdetailVideo] = useState({})
	const handleOpenVideo = (row) => {
		setIsLoading(true)

		axiosApp
			.get(`/video/${row._id}`)
			.then((data) => {
				if (data.data.success) {
					setdetailVideo(data.data.data)
					setOpen(true)
					setIsLoading(false)
				}
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})

		// fetch(`${API_URL}/video/${row._id}`).then(async (data) => {
		//   let json = await data.json();
		//   console.log(json);
		//   if (json.success) {
		//     setdetailVideo(json.data);
		//     setOpen(true);
		//     setIsLoading(false);
		//   }
		// });
	}
	
	const getlist = useCallback(()=>{
		axiosApp
			.get(`/video/list`)
			.then((data) => {
				setrows(data.data.data)
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})
	},[])
	useEffect(() => {
		getlist()
		// fetch(`${API_URL}/video/list`).then(async (data) => {
		//   console.log(data);
		//   let result = await data.json();
		//   console.log(result);
		//   if (result.success) {
		//     setrows(result.data);
		//   }
		// });
		
		// getApi(`${API_URL}/video/list`,{}).then(result=>{
		//     if (result.success) {
		//     setrows(result.data);
		//   }
		// })
	}, [])

	const handleAddItemToRows = (e) => {
		setrows([...rows, e])
	}
	const handleAddNewVideo = (e) => {
		let newVideo = {
			access: [],
			title: '',
			remark: '',
			isActive: true,
			parts: [
				{
					deleted: false,
					type: 'video',
					value: '',
					thumbnail: '',
					title: '',
					isDefault: true,
					startSeconds: 0,
					isNewRow: true,
					videoId: null,
				},
			],
			column1: 'Hiện Nội Dung',
			column2: 'Ẩn',
		}
		setdetailVideo(newVideo)
		setOpen(true)
	}

	const handleChecked = (e, row, value) => {
		row.checked = value
		setrows([...rows])
		e.stopPropagation()
	}
	const handleCheckAll = (value) => {
		setrows([...rows.map((f) => ({ ...f, checked: value }))])
	}
	const handleDeletes = (e) => {
		if (!rows.filter((f) => f.checked).length) {
			alert('Select the video to delete,,,')
		} else setopenCConfimDelete(true)
	}

	const handleCloseConfirm = () => {
		setopenCConfimDelete(false)
	}
	const handdleDeleteSuccess = (ids = []) => {
		setrows([...rows.filter((f) => !ids.includes(f._id))])
	}

	const handleConfirmDelete = () => {
		let itemsDelet = rows.filter((f) => f.checked)
		let arrIdDelete = itemsDelet.map((f) => f._id)
		console.log(arrIdDelete)
		setopenCConfimDelete(false)

		axiosApp
			.delete(`/video`, { data: { videos: arrIdDelete ?? [] } })
			.then((data) => {
				console.log(data)
				let result = data.data
				console.log(result)
				if (result.success) {
					setOpen(false)
					handdleDeleteSuccess(arrIdDelete ?? [])
				}
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})

		// fetch(`${API_URL}/video`, {
		//   method: "DELETE",
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		//   body: JSON.stringify({videos:arrIdDelete??[]}),
		// }).then(async (data) => {
		//   console.log(data);
		//   let result = await data.json();
		//   console.log(result);
		//   if(result.success){
		//     setOpen(false)
		//     handdleDeleteSuccess(arrIdDelete??[])
		//   }
		// });
	}
	const [strSearch,setStrSearch]=useState();
	const handleChange=(value)=>{
		setStrSearch((value??"").toUpperCase())
	}
	return (
		<>
			{isLoading && <Loading size={40} />}
			<Box className={cx('mainVideoBox')}>
				<Box className={cx('headerBox')}>
					<Box>
						<Typography display="inline">VIDEOS</Typography>
					</Box>
					<Box style={{ flex: 'auto' }} display="flex" justifyContent="center" alignContent={"center"}>
						<SearchBox onChange={handleChange} />
					</Box>
					<Box>
						{currentUser?.role === 'admin' && (
							<Button
								onClick={handleAddNewVideo}
								className={cx('buttonDefault')}
								color="primary"
							>
								<FontAwesomeIcon icon={faAdd} />
								THÊM
							</Button>
						)}
						{currentUser?.role === 'admin' && (
							<Button
								onClick={handleDeletes}
								className={cx('buttonDefault')}
								color="primary"
							>
								<FontAwesomeIcon icon={faTrashAlt} />
								XÓA
							</Button>
						)}
					</Box>
				</Box>
				<Box className={cx('mainBox')}>
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell align="center">
										<Checkbox
											onChange={(e, value) =>
												handleCheckAll(value)
											}
										></Checkbox>
									</TableCell>
									<TableCell>Tiêu đề</TableCell>
									<TableCell align="center">Mô tả</TableCell>
									{/* <TableCell align="center">Trạng thái</TableCell> */}
									<TableCell align="center">Đã tạo</TableCell>
									<TableCell align="center">
										Người tạo
									</TableCell>
									<TableCell align="right">
										Phân đoạn
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.filter(f=>
								f.title.toUpperCase().includes(strSearch)||
								f.remark.toUpperCase().includes(strSearch)
								).map(
									(
										row //title, remark, isActive, createdAt, createdBy, partsCount
									) => (
										<TableRow
											onClick={() => handleOpenVideo(row)}
											hover={true}
											key={row.name}
											style={{ cursor: 'pointer' }}
											sx={{
												'&:last-child td, &:last-child th':
													{ border: 0 },
											}}
										>
											<TableCell align="center">
												<Checkbox
													checked={
														row.checked ?? false
													}
													onClick={(e) =>
														e.stopPropagation()
													}
													onChange={(e, value) =>
														handleChecked(
															e,
															row,
															value
														)
													}
												/>
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{row.title}
											</TableCell>
											<TableCell align="left">
												{row.remark}
											</TableCell>
											{/* <TableCell align="center">
                        <Switch size="small" disable checked={row.isActive} />
                      </TableCell> */}
											<TableCell align="right">
												{timeConvert(
													new Date(row.createdAt)
												)}
											</TableCell>
											<TableCell align="right">
												{row.createdBy?.fullname}
											</TableCell>
											<TableCell align="right">
												{row.partsCount}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
			<Backdrop style={{ color: '#fff', zIndex: 800 }} open={open}>
				{open && (
					<DetailVideo
						handdleDeleteSuccess={handdleDeleteSuccess}
						detailVideo={detailVideo}
						setOpen={() => setOpen(false)}
						open={open}
						setIsLoading={setIsLoading}
						handleAddItemToRows={handleAddItemToRows}
						getlist={getlist}
					></DetailVideo>
				)}
			</Backdrop>
			<Dialog
				open={openCConfimDelete}
				onClose={handleCloseConfirm}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle
					style={{ cursor: 'move' }}
					id="draggable-dialog-title"
				>
					Xác nhận
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Bạn chắc chắn muốn xóa video?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCloseConfirm}>
						Hủy
					</Button>
					<Button onClick={handleConfirmDelete}>Xóa</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Videos
