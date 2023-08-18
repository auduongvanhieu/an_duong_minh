import classNames from "classnames/bind";
import styles from "./styles.scss";
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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import {
  faTrashAlt,
  faSave,
  faExpand,
  faCamera,
  faVideo,
  faEdit,
  faAdd,
  faChevronUp,
  faChevronDown,
  faTimes,
  faCog,
  faLink,
  faCopy,
  faCopyright,
  faCut,
  faClipboard,
  faClipboardList,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useContext, useEffect, useRef, useState } from "react";
import InputText from "../../../../components/Inputs/TextField";
import Switch from "../../../../components/Inputs/Switch";
import { secondsToTime } from "./ulti";
import EditRow from "../EditRow";
import SortPartButton from "../SortPartButton";
import { API_URL, HASH_ROUTER, HOST_URL } from "../../../../configs";
import { WidgetContext } from "../../../../context";
import ListItemButton from "@material-ui/core/ListItemSecondaryAction";
import CustomDialog from "../../../../components/Confirm";
import { axiosApp, loginCheckWidthError } from "../../../../rest";
import { ColorPicker, createColor } from "material-ui-color";

const cx = classNames.bind(styles);
// export function generateUUID() {
//   // Public Domain/MIT
//   var d = new Date().getTime(); //Timestamp
//   var d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
//   return "xxxxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = Math.random() * 16; //random number between 0 and 16
//     if (d > 0) {
//       //Use timestamp until depleted
//       r = (d + r) % 16 | 0;
//       d = Math.floor(d / 16);
//     } else {
//       //Use microseconds since page-load if supported
//       r = (d2 + r) % 16 | 0;
//       d2 = Math.floor(d2 / 16);
//     }
//     return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//   });
// }
function DetailVideo({
  open,
  setOpen,
  detailVideo,
  setIsLoading,
  handleAddItemToRows,
  handdleDeleteSuccess,
  getlist
}) {
  const {
    state: { users, currentUser },
  } = useContext(WidgetContext);
  const handleClickAway = () => {
    setOpen(false);
  };
  console.log(currentUser);
  const [detail, setdetail] = useState(detailVideo);
  const [arrDeletePart, setarrDeletePart] = useState([]);
  const [srcIframme, setsrcIframme] = useState("");
  const [fullscreen, setfullscreen] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showView, setshowView] = useState(false);
  const [openConfig, setopenConfig] = useState(false);
  const [openPart, setopenPart] = useState(false);
  const [openEditorModal, setopenEditorModal] = useState(false);
  const [currentPart, setcurrentPart] = useState(null);
  const [el, setEl] = useState();
  const handleFullScreen = () => {
    setfullscreen((f) => !f);
  };
  const handleClosePart = () => {
    setopenPart((f) => !f);
  };
  const handleOpenPart = (e) => {
    setcurrentPart(e);
  };
  const handleSaveRow = (row, field, value) => {
    row[field] = value;
    setdetail({ ...detail, parts: [...detail.parts] });
  };
  const handleSaveInfo = (field, value) => {
    setdetail({ ...detail, [field]: value });
  };
  const handleUp = (row, index) => {
    const fromIndex = index - 1;
    const toIndex = index;
    const element = detail.parts.splice(fromIndex, 1)[0];
    detail.parts.splice(toIndex, 0, element);
    setdetail({ ...detail, parts: [...detail.parts] });
    console.log("up", index);
  };
  const handleDown = (row, index) => {
    const fromIndex = index;
    const toIndex = index + 1;
    const element = detail.parts.splice(fromIndex, 1)[0];
    detail.parts.splice(toIndex, 0, element);
    setdetail({ ...detail, parts: [...detail.parts] });
    console.log("down", index);
  };
  const handleAddPart = () => {
    let newPart = {
      deleted: false,
      type: detail.parts.length ? "part" : "video",
      value: "",
      thumbnail: "",
      title: "",
      isDefault: true,
      startSeconds: 0,
      isNewRow: true,
      videoId: detail._id,
    };
    setcurrentPart(newPart);
    setdetail({ ...detail, parts: [...detail.parts, newPart] });
  };
  const sortContent = (row, index) => (
    <SortPartButton
      row={row}
      index={index}
      handleUp={() => handleUp(row, index)}
      handleDown={() => handleDown(row, index)}
    />
  );
  const handleCheckAll = (e) => {
    for (let i = 1; i < detail.parts.length; i++) {
      detail.parts[i] = { ...detail.parts[i], checked: e };
    }
    setdetail({ ...detail, parts: [...detail.parts] });
  };
  const handleDeletePart = () => {
    let arr = [];
    let arrNew = [];
    for (let i = 1; i < detail.parts.length; i++) {
      if (detail.parts[i].checked) {
        if (!detail.parts[i].isNewRow) arr.push(detail.parts[i]);
        arrNew.push(detail.parts[i]);
      }
    }
    setarrDeletePart([...arrDeletePart, ...arr]);
    setdetail({ ...detail, parts: [...detail.parts.filter((item) => !arrNew.includes(item))] });
  };
  const handleUpdateVideo = () => {
    console.log(detail);
    let payload = JSON.parse(JSON.stringify(detail));
    payload.column3=column3.css.backgroundColor||'white'
    payload.column4=column4.css.backgroundColor||'rgba(0,109,192,0.52)'
    payload.column5=column5.css.backgroundColor||"#01A0C6"
    payload.column6=column6.css.backgroundColor||'rgba(255,255,255,0.1)'
    payload.column8=column8.css.backgroundColor||'#47daff46'
    payload.column10=column9.css.backgroundColor||'#264e85'
    delete payload.banners;
    delete payload.createdBy;
    delete payload.createdAt;
    delete payload.deleted;
    delete payload.updatedAt;
    delete payload.views;
    delete payload.slug;
    delete payload._id;
    for (let j of payload.parts) delete j.isNewRow;
    setIsLoading(true);
    let url = detail._id ? `/video/${detail.slug}?stamp=${detail.stamp}` : `/video`;
    if (detail._id) {
      axiosApp
        .put(url, payload)
        .then((data) => {
          reloadVideo()
          getlist()
          setIsLoading(false);
        })
        .catch((e) => {
    setIsLoading(false);
          console.log(e)
          if(!e.response.data.success){
            setmessError(e.response.data.message)
            setshowError(true)
          }
          loginCheckWidthError(e);
        });
    } else {
      axiosApp
        .post(url, payload)
        .then((data) => {
          getlist()
          setIsLoading(false);
          let j = data.data.data;
          handleAddItemToRows({
            _id: j?._id,
            title: j?.title,
            remark: j?.remark,
            isActive: j?.isActive,
            createdAt: j?.createdAt,
            createdBy: j?.access[0],
            partsCount: j?.parts?.length,
          });
          setdetail(j);
        })
        .catch((e) => {
    setIsLoading(false);
          console.log(e)
          loginCheckWidthError(e);
        });
    }

    const reloadVideo=()=>{
      axiosApp
			.get(`/video/${detail._id}`)
			.then((data) => {
				if (data.data.success) {
					setdetail(data.data.data)
				}
			})
			.catch((e) => {
				loginCheckWidthError(e)
			})
    }

    // fetch(url, {
    //   method: detail._id ? "PUT" : "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(payload),
    // }).then(async (data) => {
    //   let result = await data.json();
    //   console.log(result);
    //   setIsLoading(false);
    //   if (!detail._id) {
    //     let j = result.data;
    //     handleAddItemToRows({
    //       _id: j?._id,
    //       title: j?.title,
    //       remark: j?.remark,
    //       isActive: j?.isActive,
    //       createdAt: j?.createdAt,
    //       createdBy: j?.access[0],
    //       partsCount: j?.parts?.length,
    //     });
    //     setdetail(j)
    //   }
    // });
  };
  const checkBoxContent = (row, index) => (
    <Checkbox
      checked={row?.checked ?? false}
      onChange={(_, e) => {
        handleSaveRow(row, "checked", e);
        _.stopPropagation();
      }}
    />
  );
  const getUrlImage = (str) => {
    if (str.startsWith("http")) return str;
    else return `${API_URL}${str}`;
  };
  const imageAddUserRef = useRef();
  const configRef = useRef();
  const handleAddEditor = () => {
    setopenEditorModal(true);
  };
  const handleSelectUser = (user) => {
    handleSaveInfo("access", [...detail.access, user._id]);
  };
  const handleRemoveEditor = (user) => {
    //àdsffffffffffffffffffffffffffffffffffffff
    if (currentUser?.role === "member") return;
    handleSaveInfo("access", [...detail.access.filter((f) => f !== user)]);
  };
  const handleConfig = () => {
    setopenConfig(true);
  };
  const handleCopy = (f) => {
    const el = document.createElement("textarea");
    el.value = f;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Đã sao chép đường link: " + f);
  };

  const handleOkDelete = (e) => {
    e.stopPropagation();
    if (!detail._id) {
      setOpen(false);
    } else {
      axiosApp
        .delete(`/video`, { data: { videos: [detail._id] } })
        .then((data) => {
          if (data.data.success) {
            setOpen(false);
            handdleDeleteSuccess([detail._id]);
          }
        })
        .catch((e) => {
          loginCheckWidthError(e);
        });

      // fetch(`${API_URL}/video`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ videos: [detail._id] }),
      // }).then(async (data) => {
      //   let result = await data.json();
      //   console.log(result);
      //   if (result.success) {
      //     setOpen(false);
      //     handdleDeleteSuccess([detail._id]);
      //   }
      // });
    }
    //api-spro.tb-web.site/video/{slug/id}
  };
  //const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [showError,setshowError]=useState(false)
  const [messError,setmessError]=useState('')
  useEffect(()=>{
    if(detail._id){
      axiosApp.get(`/video/stamp?video=${detail._id}`).then(({data:{data:{stamp}}})=>{
        if(stamp){
          handleSaveInfo('stamp',stamp)
        }
      })
    }
  },[])
    
  const [column3, setcolumn3] = useState(createColor(detail.column3));
  const [column4, setcolumn4] = useState(createColor(detail.column4));
  const [column5, setcolumn5] = useState(createColor(detail.column5));
  const [column6, setcolumn6] = useState(createColor(detail.column6));
  const [column8, setcolumn8] = useState(createColor(detail.column8));
  const [column9, setcolumn9] = useState(createColor(detail.column10));

  const handleUpload = (e) => {
    e.stopPropagation()
    console.dir(fileRef.current);
    fileRef.current.click();
};

const [fontError,setfontError]=useState(false)
  const fileRef = useRef();
  const handleUploadFont=(e)=>{
    if (!e.target.files[0]) {
      return;
  } else if (!e.target.files[0].name.endsWith('.ttf')&&!e.target.files[0].name.endsWith('.woff')) {
    setfontError(true);
  } else {
      let a = new FormData();
      a.append('image', e.target.files[0]);
      fetch(`${API_URL}/upload`, { method: 'POST', body: a })
          .then(async (data) => {
              let result = await data.json();
              if (!result.success)
              setfontError(true);
              else {
                handleSaveInfo('column7',result.data);
              }
          })
          .catch((error) => {
            setfontError(true);
          });
  }
  }

  return (
    <>
      <Popper
        className={cx("popper", { fullScreen: fullscreen })}
        open={open}
        style={{ position: "fixed", bottom: 0, right: 0, top: "unset", left: "unset", zIndex: 900 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Slide direction="left" in={open} mountOnEnter unmountOnExit>
                <Paper className={cx("paper")}>
                  <Box className={cx("headerdd")}>
                    <Box className={cx("title")}>
                      <Typography variant="h6">{detail.title}</Typography>
                    </Box>
                    <Box className={cx("action")}>
                      {/* <Button variant="contained" className={cx("buttonDefault")}>
                        <Switch label="Avtive" checked></Switch>
                      </Button> */}
                      {currentUser?.role === "admin" && (
                        <Button
                          onClick={() => setShowConfirmDelete(true)}
                          variant="contained"
                          className={cx("buttonDefault")}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                          Delete
                        </Button>
                      )}
                      <Button
                        onClick={handleUpdateVideo}
                        variant="contained"
                        className={cx("buttonDefault")}
                      >
                        <FontAwesomeIcon icon={faSave} />
                        save
                      </Button>
                      <Button
                        ref={configRef}
                        onClick={handleConfig}
                        variant="contained"
                        className={cx("buttonDefault")}
                      >
                        <FontAwesomeIcon icon={faCog} />
                        Configs
                      </Button>
                      <IconButton onClick={handleFullScreen} aria-label="upload picture">
                        <FontAwesomeIcon icon={faExpand} />
                      </IconButton>
                      <IconButton onClick={handleClickAway} aria-label="upload picture">
                        <FontAwesomeIcon icon={faTimes} />
                      </IconButton>
                      <Popper
                        anchorEl={configRef.current}
                        open={openConfig}
                        placement="bottom-start"
                        style={{ zIndex: 901 }}
                      >
                        {({ TransitionProps }) => (
                          <Grow {...TransitionProps}>
                            <ClickAwayListener onClickAway={() => setopenConfig(false)}>
                              <Paper
                                style={{
                                  width: 500,
                                  padding: 20,
                                  height: "max-content",
                                  maxHeight: "500px",
                                  overflowY: "auto",
                                  boxShadow: "0px 10px 20px gray",
                                  zIndex: 901,
                                  paddingBottom: 100,
                                }}
                              >
                                <Box display={"inline-block"} p={1}>
                                  <ColorPicker
                                    hideTextfield
                                    value={column3}
                                    onChange={(color) =>
                                      setcolumn3(color)
                                    }
                                  />
                                  Màu Title
                                </Box>
                                <Box display={"inline-block"}  p={1}>
                                  <ColorPicker
                                    hideTextfield
                                    value={column4}
                                    onChange={(color) =>
                                      setcolumn4(color)
                                    }
                                  />
                                  Nền Title
                                </Box>
                                <Box display={"inline-block"}  p={1}>
                                  <ColorPicker
                                    hideTextfield
                                    value={column5}
                                    onChange={(color) =>
                                      setcolumn5(color)
                                    }
                                  />
                                  Màu Nút
                                </Box>
                                <Box display={"inline-block"} p={1} >
                                  <ColorPicker
                                    hideTextfield
                                    value={column6}
                                    onChange={(color) =>
                                      setcolumn6(color)
                                    }
                                  />
                                  Nền Nút
                                </Box>
                                <Box display={"inline-block"} p={1} >
                                  <ColorPicker
                                    hideTextfield
                                    value={column8}
                                    onChange={(color) =>
                                      setcolumn8(color)
                                    }
                                  />
                                  Nền Navbar
                                </Box>
                                <Box display={"inline-block"} p={1} >
                                  <ColorPicker
                                    hideTextfield
                                    value={column9}
                                    onChange={(color) =>
                                      setcolumn9(color)
                                    }
                                  />
                                  Màu thanh cuộn
                                </Box>

<Box display={'flex'} pt={3}>
  <InputText
  disabled
  style={{ }}
  value={detail.column7??""}
  label="Link font chữ"
  onChange={({ target: { value } }) =>
    handleSaveInfo("column7", value)
  }
></InputText>
<Button onClick={handleUpload} >Upload</Button>
</Box>
                                <InputText
                                  style={{ marginButtom: 10, marginTop: 60 }}
                                  value={detail.column1}
                                  label="Show"
                                  onChange={({ target: { value } }) =>
                                    handleSaveInfo("column1", value)
                                  }
                                ></InputText>
                                <Box style={{ height: 10 }}></Box>
                                <InputText
                                  value={detail.column2}
                                  label="Hide"
                                  onChange={({ target: { value } }) =>
                                    handleSaveInfo("column2", value)
                                  }
                                ></InputText>
                              </Paper>
                            </ClickAwayListener>
                          </Grow>
                        )}
                      </Popper>
                    </Box>
                  </Box>
                  <Box className={cx("content")}>
                    <Box className={cx("infomation")}>
                      <Box style={{ paddingBottom: 10 }}>
                        <Typography variant="h6" display="inline">
                          Infomation{" "}
                        </Typography>
                        <Chip
                          onClick={() =>
                            handleCopy(
                              HOST_URL + (HASH_ROUTER ? "/#" : "") + `/player?slug=${detail.slug}`
                            )
                          }
                          title="Coppy"
                          size="small"
                          style={{
                            background: "rgb(133, 133, 133)",
                            marginLeft: 10,
                            color: "gray",
                            cursor: "pointer",
                          }}
                          label={
                            <Typography variant="span" style={{ color: "white" }}>
                              <FontAwesomeIcon icon={faLink} style={{ marginRight: 5 }} />
                              {HOST_URL + (HASH_ROUTER ? "/#" : "")}/player?slug={detail.slug}
                            </Typography>
                          }
                        />
                        <Chip
                          onClick={() => {
                            // setsrcIframme(
                            //   HOST_URL + (HASH_ROUTER ? "/#" : "") + `/player?slug=${detail.slug}`
                            // );
                            // setshowView(true);
                            window.open(
                              HOST_URL + (HASH_ROUTER ? "/#" : "") + `/player?slug=${detail.slug}`
                            );
                          }}
                          title="View"
                          size="small"
                          style={{
                            background: "rgb(146, 0, 0)",
                            marginLeft: 10,
                            color: "gray",
                            cursor: "pointer",
                          }}
                          label={
                            <Typography variant="span" style={{ color: "white" }}>
                              <FontAwesomeIcon icon={faEye} style={{ marginRight: 5 }} />
                            </Typography>
                          }
                        />
                      </Box>
                      <Box style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                        <InputText
                          value={detail.title}
                          label="title"
                          onChange={({ target: { value } }) => handleSaveInfo("title", value)}
                        ></InputText>
                        <InputText
                          value={detail.remark}
                          label="remark"
                          onChange={({ target: { value } }) => handleSaveInfo("remark", value)}
                        ></InputText>
                      </Box>
                    </Box>
                    <Box className={cx("auth")}>
                      <Box style={{ paddingBottom: 10 }}>
                        <Typography variant="h6">Editors</Typography>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignContent: "center",
                          padding: 10,
                          border: "solid 1px rgb(211, 211, 211)",
                          borderRadius: 10,
                          flex: "auto",
                        }}
                      >
                        {detail.access.map((pepple) => {
                          let user = users?.find((f) => f._id === pepple);
                          return (
                            <Avatar
                              onClick={() => handleRemoveEditor(pepple)}
                              alt={user?.fullname}
                              title={user?.fullname}
                              src={getUrlImage(user?.avatar ?? "")}
                              style={{
                                width: 44,
                                height: 44,
                                display: "inline-block",
                                cursor: "pointer",
                              }}
                            />
                          );
                        })}
                        {currentUser?.role === "admin" && (
                          <IconButton
                            ref={imageAddUserRef}
                            style={{ background: "rgb(211, 211, 211)" }}
                            onClick={handleAddEditor}
                            aria-label="upload picture"
                          >
                            <FontAwesomeIcon icon={faAdd} />
                          </IconButton>
                        )}
                        <Popper
                          anchorEl={imageAddUserRef.current}
                          open={openEditorModal}
                          placement="bottom-start"
                          style={{ zIndex: 901 }}
                        >
                          {({ TransitionProps }) => (
                            <Grow {...TransitionProps}>
                              <ClickAwayListener onClickAway={() => setopenEditorModal(false)}>
                                <Paper
                                  style={{
                                    width: 500,
                                    height: "max-content",
                                    maxHeight: "500px",
                                    overflowY: "auto",
                                    boxShadow: "0px 10px 20px gray",
                                  }}
                                >
                                  <List
                                    component="nav"
                                    sx={{
                                      width: "100%",
                                      maxWidth: 360,
                                      bgcolor: "background.paper",
                                    }}
                                  >
                                    {users
                                      ?.filter((f) => !detail.access.includes(f._id))
                                      .map((user) => {
                                        return (
                                          <ListItem
                                            onClick={() => handleSelectUser(user)}
                                            button
                                            style={{
                                              cursor: "pointer",
                                              "&:hover": {
                                                background: "rgba(0,0,0,0.5) !important",
                                              },
                                            }}
                                          >
                                            <ListItemAvatar>
                                              <Avatar
                                                alt={user?.fullname}
                                                title={user?.fullname}
                                                src={getUrlImage(user?.avatar ?? "")}
                                                style={{
                                                  width: 44,
                                                  height: 44,
                                                  display: "inline-block",
                                                }}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText
                                              primary={user?.fullname}
                                              secondary={user?.username}
                                            />
                                          </ListItem>
                                        );
                                      })}
                                  </List>
                                </Paper>
                              </ClickAwayListener>
                            </Grow>
                          )}
                        </Popper>
                      </Box>
                    </Box>
                    <Box className={cx("videopart")}>
                      <Box style={{ paddingBottom: 10, paddingRight: 10 }}>
                        <Typography variant="h6">Video Part </Typography>

                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="center">
                                  <Checkbox onChange={(_, e) => handleCheckAll(e)}></Checkbox>
                                </TableCell>
                                <TableCell>#</TableCell>
                                <TableCell>title</TableCell>
                                <TableCell align="center">type</TableCell>
                                <TableCell align="center">ID Video</TableCell>
                                <TableCell align="center">thumbnail</TableCell>
                                <TableCell align="center">Start</TableCell>
                                {/* <TableCell align="center">End</TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {detail.parts.map(
                                (
                                  row,
                                  index //title, remark, isActive, createdAt, createdBy, partsCount
                                ) =>
                                  currentPart !== row ? (
                                    <TableRow
                                      onClick={(e) => handleOpenPart(row)}
                                      hover={true}
                                      key={row.name}
                                      style={{ cursor: "pointer" }}
                                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                      <TableCell style={{ padding: 0 }}>
                                        {sortContent(row, index)}
                                      </TableCell>
                                      <TableCell align="center">
                                        {index !== 0 && checkBoxContent(row, index)}
                                      </TableCell>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell component="th" scope="row">
                                        {row.title}
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          <Chip
                                            style={{
                                              background: row.type == "video" ? "red" : "green",
                                            }}
                                            label={
                                              <Typography variant="span" style={{ color: "white" }}>
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
                                      <TableCell align="center">
                                        {row.type == "video" ? row.value : "___"}
                                      </TableCell>
                                      <TableCell align="center">
                                        <img
                                          src={row.thumbnail}
                                          width="60"
                                          style={{ borderRadius: 7 }}
                                        />
                                      </TableCell>
                                      <TableCell align="center">
                                        {secondsToTime(row.startSeconds)}
                                      </TableCell>
                                      {/* <TableCell align="center">
                                        {secondsToTime(row.endSeconds ?? 0)}
                                      </TableCell> */}
                                    </TableRow>
                                  ) : (
                                    <EditRow
                                      row={row}
                                      index={index}
                                      onSave={handleSaveRow}
                                      sortButton={sortContent(row, index)}
                                      checkBoxButton={checkBoxContent(row, index)}
                                    />
                                  )
                              )}
                              <TableRow>
                                <TableCell colSpan={7}>
                                  <Button
                                    style={{ marginRight: 5 }}
                                    onClick={handleAddPart}
                                    variant="contained"
                                    className={cx("buttonDefault")}
                                  >
                                    <FontAwesomeIcon icon={faAdd} />
                                    Thêm Part
                                  </Button>
                                  <Button
                                    style={{ marginRight: 5 }}
                                    onClick={handleDeletePart}
                                    variant="contained"
                                    className={cx("buttonDefault")}
                                  >
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                    Xóa Part đã chọn
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Slide>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
      <CustomDialog
        onClick={(e) => e.stopPropagation()}
        styles={{ zIndex: 1000 }}
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        text="Do you want to delete this video?"
        title={"Delete: " + detail.title}
        buttons={[
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmDelete(false);
            }}
          >
            Cancel
          </Button>,
          <Button onClick={handleOkDelete}>OK</Button>,
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


      <CustomDialog
        onClick={(e) => e.stopPropagation()}
        styles={{ zIndex: 1000 }}
        open={fontError}
        onClose={() => setfontError(false)}
        text="Định dạng font không được hỗ trợ"
        title={"Delete: " + detail.title}
        buttons={[
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setfontError(false);
            }}
          >
            Cancel
          </Button>,
          <Button onClick={()=>setfontError(false)}>OK</Button>,
        ]}
      />

      {/* <Modal
        open={showView}
        onBackdropClick={() => setshowView(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Paper style={style}>
      <iframe
      allowFullScreen
        id="iframe"
        src={srcIframme}
        style={{left:0,width:'600px',height:'400px'}}
      ></iframe>
      </Paper>
      </Modal> */}
      {/* <Popper placement="right" open={openPart} onClose={handleClosePart}>
        <Paper>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Paper>
      </Popper> */}
      <input
                onChange={handleUploadFont}
                type="file"
                name="image"
                ref={fileRef}
                style={{ display: 'none' }}
                onClick={e=>e.stopPropagation()}
            />
    </>
  );
}

export default DetailVideo;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: 50,
};
