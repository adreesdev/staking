import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const GeneralStakingDetails = ({ generalStakingData }) => {
	return (
		<>
			<Box sx={{ width: "100%", textAlign: "center" }} my={5}>
				<Typography
					sx={{
						fontSize: "2.5rem",
					}}
				>
					General Staking Details
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
				mb={2}
			>
				<Grid container>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Owner:{" "}
							{generalStakingData.owner?.slice(0, 6) +
								"..." +
								generalStakingData.owner?.slice(-4)}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total Staked Token:{" "}
							{generalStakingData?.totalStakedToken?.toString()}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total Stakers: {generalStakingData?.totalStakers}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total UnStaked: {generalStakingData?.totalUnStakedTokens}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total Withdrawan: {generalStakingData?.totalWithdrawanTokens}
						</Typography>
					</Grid>
					<Grid item md={6} xs={12} textAlign="center" p={5}>
						<Typography variant="h5">
							Total Claimed Reward:{" "}
							{generalStakingData?.totalClaimedRewardToken}
						</Typography>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default GeneralStakingDetails;
