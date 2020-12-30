import "./App.css";
import { useState } from "react";
import useFormInput from "./hooks/useFormInput";
import shopifyLogo from "./images/shopifylogo.jpg";
import {
	CircularProgress,
	Button,
	makeStyles,
	withStyles,
	fade,
} from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import useCreateUser from "./hooks/useCreateUser";
import useLoginUser from "./hooks/useLoginUser";
import MovieApp from "./MovieApp";

export default function App() {
	return <Shoppies />;
}

function Shoppies() {
	const [userCreated, setUserCreated] = useState(false);
	const [userId, setUserId] = useState();
	const [createUser] = useCreateUser();
	const [logInUser] = useLoginUser();
	const [loginError, setLoginError] = useState(false);
	const user = useFormInput();
	const [signInLoading, setSignInLoading] = useState(false);
	function handleSignIn() {
		setSignInLoading(true);
		setLoginError(false);
		logInUser(
			{
				name: user.value,
			},
			{
				onSuccess: ({ data }) => {
					console.log(data);
					setSignInLoading(false);

					if (data === "") {
						setLoginError(
							"Account not found. Please create an account using your name"
						);
					} else {
						setUserId(data.id);
						setUserCreated(true);
					}
				},
			}
		);
	}

	function handleCreateUser() {
		setSignInLoading(true);

		setLoginError(false);
		createUser(
			{
				name: user.value,
			},
			{
				onSuccess: ({ data }) => {
					setSignInLoading(false);
					setUserId(data);
					setUserCreated(true);
				},
			}
		);
	}

	return (
		<div className="App">
			{userCreated ? (
				<SnackbarProvider maxSnack={1}>
					<MovieApp
						id={userId}
						logout={() => {
							setUserCreated(false);
							setUserId(false);
						}}
					/>
				</SnackbarProvider>
			) : (
				<div style={{ height: "100%" }}>
					<div className="loginContainer">
						<div
							style={{ width: "50%", height: "max-content", margin: "auto" }}
						>
							<img
								src={shopifyLogo}
								alt={"shopify logo"}
								width="100%"
								style={{ margin: "auto" }}
							/>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								width: "50%",
							}}
						>
							<p
								style={{
									fontSize: "20px",

									fontWeight: "800",
									fontFamily: "Helvetica",
								}}
							>
								Work with Purpose
							</p>
							<p
								style={{
									fontSize: "20px",

									fontWeight: "800",
									fontFamily: "Helvetica",
								}}
							>
								Work with Shopify
							</p>
							<p
								style={{
									fontSize: "25px",
									fontWeight: "600",
									color: "#95BF47",
									fontFamily: "Helvetica",
								}}
							>
								Work with Nourish as well
							</p>
							<p
								style={{
									fontSize: "20px",

									fontWeight: "800",
									fontFamily: "Helvetica",
								}}
							>
								Summer 2021 Front end software engineering internship challenge.
							</p>
							<p
								style={{
									fontSize: "20px",

									fontWeight: "800",
									fontFamily: "Helvetica",
								}}
							>
								Backend server is also built using MongoDB. Consider me for
								backend as well please.
							</p>
							<p
								style={{
									fontSize: "20px",
									fontWeight: "600",
									fontFamily: "Helvetica",
									color: "#578bd4",
								}}
							>
								Shoppies| Movie Award for entrepreneurs
							</p>
							<input
								type="text"
								placeholder="Name"
								value={user.value}
								onChange={user.onChange}
								maxLength="30"
								className="inputBox"
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-evenly",
									marginTop: "25px",
								}}
							>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => handleCreateUser()}
								>
									Create account
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleSignIn()}
								>
									Login using name
								</Button>
							</div>
							<p style={{ color: "red" }}>
								{loginError && <p> {loginError}</p>}
							</p>
							{signInLoading ? <StyledCircularProgress /> : null}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

const StyledCircularProgress = withStyles((theme) => ({
	root: {
		color: "blue",
		display: "block",
		margin: "auto",
		marginTop: "10%",
		height: "75px",
		width: "75px",
	},
}))(CircularProgress);
