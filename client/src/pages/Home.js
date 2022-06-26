import Wrapper from "../assets/wrappers/Home";
import { Alert, FormRow, Logo } from "../components/";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const userInitialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	isMember: true,
};

const Home = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState(userInitialState);
	const { user, showAlert, displayAlert, setupUser } = useAppContext();

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { name, email, password, confirmPassword, isMember } = values;

		if (!email || !password || (!isMember && !name)) {
			displayAlert('error', 'Please provide all values');
			return;
		}

		const currentUser = { name, email, password };

		if (isMember) {
			setValues({ ...userInitialState, email });
			setupUser({
				currentUser,
				endPoint: "login",
				alertText: "Login Succesfull! Redirecting...",
			});
		} else {
			setValues({ ...userInitialState, isMember: false, name, email });
			if (password !== confirmPassword) {
				displayAlert('error', 'Passwords do not match');
				return;
			}
			setupUser({
				currentUser,
				endPoint: "register",
				alertText: "User Created! Redirecting...",
			});
		}
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/me");
			}, 3000);
		}
	}, [user, navigate]);

	return (
		<>
			<Wrapper>
				<div className="register-container">
					<div className="register-header">
						<Logo />
					</div>

					<form onSubmit={onSubmit}>
						<span className="title">
							{values.isMember ? "LOGIN" : "REGISTER"}
						</span>

						{showAlert && <Alert />}
						{!values.isMember && (
							<FormRow
								type="text"
								name="name"
								value={values.name}
								handleChange={handleChange}
							/>
						)}

						<FormRow
							type="email"
							name="email"
							value={values.email}
							handleChange={handleChange}
						/>

						<FormRow
							type="password"
							name="password"
							value={values.password}
							handleChange={handleChange}
						/>
						{!values.isMember && (
							<FormRow
								type="password"
								name="confirmPassword"
								value={values.confirmPassword}
								labelText="confirm password"
								handleChange={handleChange}
							/>
						)}

						<button type="submit">SUBMIT</button>
					</form>

					<p>
						{values.isMember ? "Not a member yet?" : "Already a member?"}
						<button type="button" onClick={toggleMember} className="member-btn">
							{values.isMember ? "Register" : "Login"}
						</button>
					</p>
				</div>
			</Wrapper>
		</>
	);
};

export default Home;
