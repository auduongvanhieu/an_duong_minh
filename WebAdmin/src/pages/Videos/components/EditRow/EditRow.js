import classNames from 'classnames/bind';
import styles from './styles.scss';
import {
    Box,
    Typography,
    Button,
    Checkbox,
    Slide,
    Popper,
    Grow,
    IconButton,
    Badge,
    Chip,
    Modal,
} from '@material-ui/core';
import {
    faTrashAlt,
    faSave,
    faExpand,
    faCamera,
    faVideo,
    faChevronUp,
    faChevronDown,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useRef, useState } from 'react';
import InputText from '../../../../components/Inputs/TextField';
import Switch from '../../../../components/Inputs/Switch';
import { secondsToTime, timeToSecond } from './ulti';
import { API_URL } from '../../../../configs';

const cx = classNames.bind(styles);

function EditRow({
    row,
    index,
    onSave = (row, field, value) => {},
    sortButton: SortButton,
    checkBoxButton,
}) {
    const [showModal, setshowModal] = useState(false);
    const [errormessage, seterrormessage] = useState('');
    const [uploading, setuploading] = useState([]);
    const fileRef = useRef();
    const handleShowModanWithMess = (mess) => {
        seterrormessage(mess);
        setshowModal(true);
    };
    const handleUploadImage = () => {
        console.dir(fileRef.current);
        fileRef.current.click();
    };

    const handleFileChange = (e) => {
        console.log(e);
        if (!e.target.files[0]) {
            return;
        } else if (!e.target.files[0].type.startsWith('image')) {
            handleShowModanWithMess('Định dạng file không dc hỗ trợ');
        } else {
            let a = new FormData();
            a.append('image', e.target.files[0]);
            fetch(`${API_URL}/upload`, { method: 'POST', body: a })
                .then(async (data) => {
                    let result = await data.json();
                    if (!result.success)
                        handleShowModanWithMess(
                            'Lỗi upload file, thử lại sau...',
                        );
                    else {
                        onSave(row, 'thumbnail', result.data);
                    }
                })
                .catch((error) => {
                    handleShowModanWithMess('Lỗi upload file, thử lại sau...');
                });
        }
    };

    const handleChangePart = () => {
        if (index === 0) {
            seterrormessage('Không thể thay đổi kiểu của PART mặc định');
            setshowModal(true);
            return;
        }
        let type = row.type == 'video' ? 'part' : 'video';
        if (type == 'part') onSave(row, 'value', null);
        onSave(row, 'type', type);
    };
    return (
        <>
            <TableRow
                hover={true}
                style={{ cursor: 'pointer' }}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell style={{ padding: 0 }}>{SortButton}</TableCell>
                <TableCell align="center">
                    {index !== 0 && checkBoxButton}
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                    <InputText
                        label=""
                        value={row.title}
                        onChange={({ target: { value } }) =>
                            onSave(row, 'title', value)
                        }
                    ></InputText>
                </TableCell>
                <TableCell width={75} align="left">
                    {
                        <Chip
                            onClick={handleChangePart}
                            style={{
                                background:
                                    row.type == 'video' ? 'red' : 'green',
                            }}
                            label={
                                <Typography
                                    variant="span"
                                    style={{ color: 'white' }}
                                >
                                    <FontAwesomeIcon
                                        icon={faVideo}
                                        style={{ marginRight: 5 }}
                                    />
                                    {row.type}
                                </Typography>
                            }
                        />
                    }
                </TableCell>
                <TableCell width={150} align="center">
                    {row.type === 'video' ? (
                        <InputText
                            label=""
                            value={row.value}
                            onChange={({ target: { value } }) =>
                                onSave(row, 'value', value)
                            }
                        ></InputText>
                    ) : (
                        '___'
                    )}
                </TableCell>
                <TableCell align="center">
                    {row.thumbnail ? (
                        <img
                            alt="image"
                            onClick={handleUploadImage}
                            src={row.thumbnail}
                            width="60"
                            style={{ borderRadius: 7 }}
                        />
                    ) : (
                        <IconButton
                            onClick={handleUploadImage}
                            style={{ fontSize: 13 }}
                        >
                            <FontAwesomeIcon
                                icon={faUpload}
                                style={{ marginRight: 5 }}
                            />
                            Upload image
                        </IconButton>
                    )}
                </TableCell>
                <TableCell width={100} align="center">
                    <InputText
                        label=""
                        value={secondsToTime(row.startSeconds)}
                        onChange={({ target: { value } }) =>
                            onSave(row, 'startSeconds', timeToSecond(value))
                        }
                    />
                </TableCell>
                {/* <TableCell width={100} align="right">
                    <InputText
                        label=""
                        value={secondsToTime(row.endSeconds ?? 0)}
                        onChange={({ target: { value } }) =>
                            onSave(row, 'endSeconds', timeToSecond(value))
                        }
                    />
                </TableCell> */}
            </TableRow>
            <Modal
                open={showModal}
                onBackdropClick={() => setshowModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Paper style={style}>
                    <Typography variant="h5">{errormessage}</Typography>
                </Paper>
            </Modal>
            <input
                onChange={handleFileChange}
                type="file"
                name="image"
                ref={fileRef}
                style={{ display: 'none' }}
            />
        </>
    );
}

export default EditRow;

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
};
