import { Box, Divider, Grid, Typography } from "@mui/material";
import { formatUnits } from "ethers/lib/utils";
import React from "react";
import { useContractReads } from "wagmi";
import StakingCalculate from "./StakingCalculate";

const StakingPlanDetails = ({ stakingContract }) => {
	const totalPlans = 5;
	const multiRead = (value, name) => {
		let data = [];
		for (let index = 0; index < value; index++) {
			data.push({
				...stakingContract,
				functionName: name,
				args: [index],
			});
		}
		return {
			data: data,
		};
	};
	const { data: durationContract } = multiRead(totalPlans, "Duration");
	const { data: bonusContract } = multiRead(totalPlans, "Bonus");
	const { data: totalStakedPerPlanContract } = multiRead(
		totalPlans,
		"totalStakedPerPlan"
	);
	const { data: totalStakersPerPlanContract } = multiRead(
		totalPlans,
		"totalStakersPerPlan"
	);

	const { data: Duration } = useContractReads({
		contracts: durationContract,
		// watch: true,
	});
	const { data: Bonus } = useContractReads({
		contracts: bonusContract,
		// watch: true,
	});
	const { data: totalStakedPerPlan } = useContractReads({
		contracts: totalStakedPerPlanContract,
		// watch: true,
	});
	const { data: totalStakersPerPlan } = useContractReads({
		contracts: totalStakersPerPlanContract,
		// watch: true,
	});

	return (
		<>
			<Box sx={{ width: "100%", textAlign: "center" }} my={5}>
				<Typography
					sx={{
						fontSize: "2.5rem",
					}}
				>
					Staking Plan Details
				</Typography>
			</Box>
			<Grid container spacing={5}>
				{Duration &&
					Duration.map((Duration, index) => (
						<Grid item md={6} xs={12} key={index}>
							<Box
								sx={{
									width: "100%",
									borderRadius: "40px 0px",
									border: "2px solid #6247AA",
									boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
									transition: "0.5s all",
									"&:hover": {
										backgroundImage:
											"linear-gradient(to bottom right, #6247AA , #A594F9)",
										boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
									},
								}}
								p={2}
							>
								<Typography variant="h4" textAlign="center">
									Plan {index}
								</Typography>
								<br />
								<Divider />
								<br />

								<Typography variant="h5">
									Duration:
									{Duration / 86400} Days
								</Typography>
								<br />
								<Typography variant="h5">
									Bonus:
									{+Bonus[index]}
								</Typography>
								<br />
								<Typography variant="h5">
									Total Stakers:
									{+totalStakersPerPlan[index]}
								</Typography>
								<br />
								<Typography variant="h5">
									Total Staked:
									{Number(
										formatUnits(totalStakedPerPlan[index]?.toString())
									)?.toFixed(2)}
								</Typography>
							</Box>
						</Grid>
					))}
			</Grid>
			<StakingCalculate Duration={Duration} stakingContract={stakingContract} />
		</>
	);
};

export default StakingPlanDetails;
