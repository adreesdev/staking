import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect } from "wagmi";

const ConnectModal = ({
	openModal,
	handleCloseModal,
	setOpenBackdrop,
	setOpenModal,
}) => {
	const { connect, connectors, isLoading, error } = useConnect();
	const { isConnected } = useAccount();

	useEffect(() => {
		if (isLoading) setOpenBackdrop(true);
		if (error) {
			setOpenBackdrop(false);
			toast(error.message);
		}
		if (isConnected) {
			setOpenModal(false);
			setOpenBackdrop(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, error, isConnected]);
	return (
		<>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						background: "#000",
						borderRadius: "30px 0px",
						outline: "none",
						display: "flex",
						flexDirection: "column",
						border: "5px inset #A594F9",
					}}
					p={5}
				>
					<Typography textAlign={"center"} variant="h5">
						Wallet Connect
					</Typography>
					{connectors.map((connector, index) => (
						<Box
							key={connector.id}
							disabled={!connector.ready}
							onClick={() => connect({ connector })}
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
							py={2}
							mt={3}
							px={5}
						>
							{connector.name}
						</Box>
					))}
				</Box>
			</Modal>
		</>
	);
};

export default ConnectModal;
