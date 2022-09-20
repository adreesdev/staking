import React from "react";
import { Backdrop } from "@mui/material";
import { Dna } from "react-loader-spinner";

const Loading = ({ openBackdrop }) => {
	return (
		<>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 1000,
				}}
				open={openBackdrop}
			>
				<Dna
					visible={true}
					height="80"
					width="80"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
				/>
			</Backdrop>
		</>
	);
};

export default Loading;
