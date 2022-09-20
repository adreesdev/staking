import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const NetworkHandle = ({ setOpenBackdrop }) => {
	const [switchModal, setSwitchModal] = useState(false);
	const { isConnected } = useAccount();

	const { chain } = useNetwork();
	const { chains, error, isLoading, switchNetwork } = useSwitchNetwork();

	useEffect(() => {
		if (error) {
			toast(error.message);
		}
		if (isLoading) setOpenBackdrop(true);
		else setOpenBackdrop(false);

		if (isConnected && chains[0].id !== chain?.id) setSwitchModal(true);
		else setSwitchModal(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, isLoading, isConnected, chain]);

	return (
		<>
			<Modal
				open={switchModal}
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
						Network Error!
					</Typography>
					{chains.map((x) => (
						<Box
							disabled={!switchNetwork || x.id === chain?.id}
							key={x.id}
							onClick={() => switchNetwork?.(x.id)}
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
							Switch To {x.name}
						</Box>
					))}
				</Box>
			</Modal>
		</>
	);
};

export default NetworkHandle;
