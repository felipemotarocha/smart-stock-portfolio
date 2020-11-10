import * as React from "react";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { Button, message } from "antd";

import { Container, Content } from "./register.styles";

import { CustomInput } from "../../components/custom-input/custom-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";

export interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { register, currentUser } = useContext(UserContext);
	const history = useHistory();

	useEffect(() => {
		if (currentUser && !currentUser.guest) history.push("/");
	}, [currentUser, history]);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleLoginClick = () => {
		history.push("/login");
	};

	const handleSubmit = () => {
		if (!name || !email || !password) {
			message.info("Please fill out all the inputs.");
			return;
		}
		if (password.length < 6) {
			message.info("The password must contain at least 6 characters.");
			return;
		}
		register(name, email, password);
	};

	return (
		<Container>
			<Content>
				<h1>Create your account and make your stock portfolio smart.</h1>
				<CustomInput
					placeholder="Name"
					type="primary"
					onChange={handleNameChange}
				/>
				<CustomInput
					placeholder="E-mail"
					type="primary"
					onChange={handleEmailChange}
				/>
				<CustomInput
					type="password"
					placeholder="Password"
					onChange={handlePasswordChange}
				/>
				<Button
					type="primary"
					onClick={handleSubmit}
					icon={<UserAddOutlined />}
				>
					Register
				</Button>
				<CustomButton
					type="primary"
					outlined
					onClick={handleLoginClick}
					icon={<LoginOutlined />}
				>
					I already have an account
				</CustomButton>
			</Content>
		</Container>
	);
};

export default RegisterPage;
