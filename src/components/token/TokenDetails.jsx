import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils";
import { useContractReads } from "wagmi";
import TokenABI from "../../contract/TokenABI.json";
import Environment from "../../contract/environment.js";

const TokenDetails = ({ setOpenBackdrop }) => {
	const [token, setToken] = useState({
		name: null,
		decimals: null,
		symbol: null,
		totalSupply: null,
	});
	const tokenContract = {
		addressOrName: Environment.TokenAddress,
		contractInterface: TokenABI,
	};

	const { data: tokenData, isLoading } = useContractReads({
		contracts: [
			{ ...tokenContract, functionName: "name" },
			{ ...tokenContract, functionName: "decimals" },
			{ ...tokenContract, functionName: "symbol" },
			{ ...tokenContract, functionName: "totalSupply" },
		],
	});

	useEffect(() => {
		if (isLoading) setOpenBackdrop(true);
		else setOpenBackdrop(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		if (tokenData) {
			let totalSupply = formatUnits(
				tokenData[3]?.toString(),
				tokenData[1]?.toString()
			)?.toString();

			setToken({
				name: tokenData[0],
				decimals: tokenData[1],
				symbol: tokenData[2],
				totalSupply: totalSupply,
			});
		}
	}, [tokenData]);
	return (
		<>
			<Box sx={{ width: "100%", textAlign: "center" }} my={5}>
				<Typography
					sx={{
						fontSize: "2.5rem",
					}}
				>
					Token Details
				</Typography>
			</Box>
			<Box
				sx={{
					width: "100%",
					borderRadius: "40px 0px",
					border: "2px solid #6247AA",
					boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
					transition: "1s all",
					"&:hover": {
						backgroundImage:
							"linear-gradient(to bottom right, #6247AA , #A594F9)",
						boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
					},
				}}
			>
				<Grid container>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">Token Name: {token.name}</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Token Decimals: {token.decimals}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">Token symbol: {token.symbol}</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total Supply: {token.totalSupply}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default TokenDetails;
