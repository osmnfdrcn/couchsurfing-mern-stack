import styled from "styled-components";

const Wrapper = styled.main`
	width: 100%;
	height: 100vh;
	background-image: url("https://ht-assets.couchsurfing.com/assets/subscribe-bg-2c2f071ba6da80bb71c208ba74dc5b2b1317b381d011057d5216a27d680c3272.jpg");
	background-position: right;
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;

	.register-container {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 400px;
		padding: 30px 40px;
		background-color: white;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 3fr 1fr;
		gap: 10px;

		.title {
			margin-bottom: 10px;
			font-size: 20px;
			font-weight: 900;
			color: #36393b;
		}

		form {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 10px;
			button {
				width: 100%;
				padding: 10px;
				border: none;
				color: white;
				background-color: #256eff;
				margin-top: 10px;
			}
		}

		p {
			display: inline-block;
			/* padding-top: 20px; */
			font-size: 15px;
			text-align: center;
			color: #868889;
		}
	}
`;

export default Wrapper;
