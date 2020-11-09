import * as React from "react";
import { useEffect, useContext, useState } from "react";
import GoogleLogin, {
	GoogleLoginResponse,
	GoogleLoginResponseOffline,
} from "react-google-login";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

import { Container, Content } from "./login.styles";
import { UserContext } from "../../contexts/user.context";

import { CustomInput } from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";

export interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { loginWithCredentials, loginWithGoogle, currentUser } = useContext(
		UserContext
	);
	const history = useHistory();

	useEffect(() => {
		if (currentUser && !currentUser.guest) history.push("/");
	}, [currentUser, history]);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLoginWithCredentials = () => {
		loginWithCredentials(email, password);
	};

	const handleLoginWithGoogle = (
		response: GoogleLoginResponse | GoogleLoginResponseOffline
	) => {
		loginWithGoogle(response as GoogleLoginResponse);
	};

	const handleCreateAnAccount = () => {
		history.push("/register");
	};

	return (
		<Container>
			<Content>
				<h1>Login to your account.</h1>
				<CustomInput
					type="email"
					placeholder="E-mail"
					onChange={handleEmailChange}
				/>
				<CustomInput
					type="password"
					placeholder="Password"
					onChange={handlePasswordChange}
				/>
				<Button type="primary" onClick={handleLoginWithCredentials}>
					Login
				</Button>
				<GoogleLogin
					clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
					buttonText="Login"
					onSuccess={handleLoginWithGoogle}
					cookiePolicy={"single_host_origin"}
					render={({ onClick }) => (
						<Button type="primary" icon={<GoogleOutlined />} onClick={onClick}>
							Login with Google
						</Button>
					)}
				/>
				<CustomButton
					type="primary"
					outlined={true}
					onClick={handleCreateAnAccount}
				>
					Create an account
				</CustomButton>
			</Content>
		</Container>
	);
};

export default LoginPage;
