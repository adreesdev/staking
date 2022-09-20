import { Box, Container, Typography } from "@mui/material";
import { ConnectKitButton } from "connectkit";
import React from "react";
// import { useAccount, useDisconnect } from "wagmi";

const Header = ({ handleOpenModal }) => {
	// const { address, isConnected } = useAccount();
	// const { disconnect } = useDisconnect();

	return (
		<>
			<Box
				sx={{
					width: "100%",
					borderBottom: "2px solid #000",
					boxShadow: "0px 0px 20px 2px rgba(0,0,0,1)",
				}}
			>
				<Container>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
						}}
						py={3}
					>
						<Typography variant="h5" py={1} color="#A594F9">
							Logo Here
						</Typography>
						{/* {!isConnected ? (
							<Box
								onClick={handleOpenModal}
								sx={{
									transition: "0.5s all",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									borderRadius: "15px 0px",
									border: "1px solid #6247AA",
									boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
									"&:hover": {
										backgroundImage:
											"linear-gradient(to bottom right, #6247AA , #A594F9)",
										boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
									},
								}}
								px={4}
							>
								Connect
							</Box>
						) : (
							<Box
								onClick={disconnect}
								sx={{
									transition: "0.5s all",
									cursor: "pointer",
									display: "flex",
									alignItems: "center",
									borderRadius: "15px 0px",
									border: "1px solid #6247AA",
									boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
									"&:hover": {
										backgroundImage:
											"linear-gradient(to bottom right, #6247AA , #A594F9)",
										boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
									},
								}}
								px={4}
							>
								{address?.slice(0, 6) + "..." + address?.slice(-4)}
							</Box>
						)} */}
						<ConnectKitButton />
					</Box>
				</Container>
			</Box>
		</>
	);
};

export default Header;
