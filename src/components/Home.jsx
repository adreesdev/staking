import { Container } from "@mui/material";
import React from "react";
import Staking from "./staking/Staking";
import TokenDetails from "./token/TokenDetails";

const Home = ({ setOpenBackdrop }) => {
	return (
		<>
			<Container>
				<TokenDetails setOpenBackdrop={setOpenBackdrop} />
				<Staking setOpenBackdrop={setOpenBackdrop} />
			</Container>
		</>
	);
};

export default Home;
