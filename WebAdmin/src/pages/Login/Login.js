import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import { axiosApp, loginCheckWidthError } from "../../rest";
import CustomDialog from '../../components/Confirm'
import { Navigate } from "react-router-dom";

export default function LoginForm() {
  const [user, setUser] = useState({});
  const [forget, setForget] = useState(false);
  const [showMess, setshowMess] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errormess, seterrormess] = useState('');
  const [isLogin, setisLogin] = useState(false);
  const handleLogin = () => {
    console.log(user);

    axiosApp
      .post(`/login`, {
        username: user.userName,
        password: user.passWord,
      })
      .then(({data}) => {
        console.log(data)
        if (data.success) {
          localStorage.setItem("token", data.token);
          //window.location.assign("/");
          setisLogin(true)
          setTimeout(() => {
            
    window.location.reload(); 
          }, 100);
        } else {
        }
      }).catch(({response:{data}})=>{
        console.log(data)
        seterrormess(data.message)
        setshowError(true)
      });
  };
  const handleForget = () => {
    console.log(user);

    axiosApp.post(`/forgot-pass`, {email:user.email}).then(({data}) => {
      console.log(data);
      if(data.success){
        setshowMess(true)
      }
    }).catch(({response:{data}})=>{
      
      console.log(data)
      seterrormess(data.message)
      setshowError(true)
    });
  };
  if(isLogin) return <Navigate  to="/dashboard" />
  return (
    <>
      {!forget && (
        <Box
          style={{
            width: "100vw",
            height: "100vh",
            background: "#ccc",
            backgroundImage: "url(http://api-spro.tb-web.site/uploads/1659192438198-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <Paper
            style={{
              width: 500,
              padding: 30,
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <Box p={2}>
              <Typography variant="h4" align="center">
                Xin chào Admin
              </Typography>
            </Box>
            <Box p={1} display="flex" flexDirection={"column"}>
              <input
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
                name='username'
                type="text"
                placeholder="Tên đăng nhập"
                onChange={({ target: { value } }) => setUser({ ...user, userName: value })}
              />
            </Box>
            <Box p={1} display="flex" flexDirection={"column"}>
              <input
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
                type="password"
                name="password"
                placeholder="Mật khẩu"
                onChange={({ target: { value } }) => setUser({ ...user, passWord: value })}
              />
            </Box>
            <Box p={1} display="flex" flexDirection={"column"}>
              <a href="#" onClick={() => setForget(true)}>
                Quên mật khẩu
              </a>
            </Box>
            <Box p={2} display="flex" flexDirection={"column"}>
              <Button
                style={{
                  display: "block",
                  width: "100%",
                  height: "50px",
                  borderRadius: "25px",
                  outline: "none",
                  border: "none",
                  backgroundImage: "linear-gradient(to right, #00BFA6, #B8CDF8, #00BFA6)",
                  backgroundSize: "200%",
                  fontSize: "1.2rem",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "uppercase",
                  margin: "1rem 0",
                  cursor: "pointer",
                  transition: "0.5s",
                }}
                color="primary"
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      {forget && (
        <Box
          style={{
            width: "100vw",
            height: "100vh",
            background: "#ccc",
            backgroundImage: "url(http://api-spro.tb-web.site/uploads/1659192438198-bg.png)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <Paper
            style={{
              width: 500,
              padding: 30,
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <Box p={2}>
              <Typography variant="h4" align="center">
                Quên mật khẩu
              </Typography>
            </Box>
            <Box p={1} display="flex" flexDirection={"column"}>
              <input
                style={{
                  padding: 10,
                  fontSize: 20,
                }}
                type="text"
                placeholder="Nhập email tài khoản"
                onChange={({ target: { value } }) => setUser({ ...user, email: value })}
              />
            </Box>
            <Box p={1} display="flex" flexDirection={"column"}>
              <a href="#" onClick={() => setForget(false)}>
                Đăng nhập
              </a>
            </Box>
            <Box p={2} display="flex" flexDirection={"column"}>
              <Button
                style={{
                  display: "block",
                  width: "100%",
                  height: "50px",
                  borderRadius: "25px",
                  outline: "none",
                  border: "none",
                  backgroundImage: "linear-gradient(to right, #00BFA6, #B8CDF8, #00BFA6)",
                  backgroundSize: "200%",
                  fontSize: "1.2rem",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  textTransform: "uppercase",
                  margin: "1rem 0",
                  cursor: "pointer",
                  transition: "0.5s",
                }}
                color="primary"
                onClick={handleForget}
              >
                Lấy lại mật khẩu
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      <CustomDialog
				onClick={e => e.stopPropagation()}
				styles={{ zIndex: 1000 }}
				open={showMess}
				onClose={() => setshowMess(false)}
				text="Mật khẩu mới đã được gửi tới E-mail của bạn!"
				title={'Thông báo'}
				buttons={[
					<Button
						onClick={e => {
							e.stopPropagation()
                            setshowMess(false)
							setForget(false)
						}}
					>
						Quay lại trang đăng nhập
					</Button>,
				]}
			/>
      <CustomDialog
				onClick={e => e.stopPropagation()}
				styles={{ zIndex: 1000 }}
				open={showError}
				onClose={() => setshowError(false)}
				text={errormess}
				title={'Thông báo'}
				buttons={[
					<Button
						onClick={e => {
							e.stopPropagation()
                            setshowError(false)
						}}
					>
						OK
					</Button>,
				]}
			/>
    </>
  );
}
