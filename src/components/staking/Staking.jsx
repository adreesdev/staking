import React, { useEffect, useState } from "react";
import stakingABI from "../../contract/StakingABI.json";
import Environment from "../../contract/environment";
import { useContractReads } from "wagmi";
import { formatUnits } from "ethers/lib/utils";
import GeneralStakingDetails from "./GeneralStakingDetails";
import StakingPlanDetails from "./StakingPlanDetails";
import StakingUserData from "./StakingUserData";

const Staking = ({ setOpenBackdrop }) => {
	const stakingContract = {
		addressOrName: Environment.StakingAddress,
		contractInterface: stakingABI,
	};

	const [generalStakingData, setGeneralStakingData] = useState({
		owner: null,
		totalStakedToken: null,
		totalStakers: "",
		totalUnStakedTokens: null,
		totalWithdrawanTokens: null,
		totalClaimedRewardToken: null,
	});

	const { data: stakingRead, isLoading } = useContractReads({
		contracts: [
			{ ...stakingContract, functionName: "owner" },
			{ ...stakingContract, functionName: "totalStakedToken" },
			{ ...stakingContract, functionName: "totalStakers" },
			{ ...stakingContract, functionName: "totalUnStakedToken" },
			{ ...stakingContract, functionName: "totalWithdrawanToken" },
			{ ...stakingContract, functionName: "totalClaimedRewardToken" },
		],
		// watch: true,
	});

	useEffect(() => {
		if (isLoading) setOpenBackdrop(true);
		else setOpenBackdrop(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	const tokencoming = (value) => {
		if (stakingRead) {
			let token = formatUnits(value.toString()).toString();
			token = parseFloat(token).toFixed(2);
			return token;
		}
	};

	useEffect(() => {
		if (stakingRead) {
			setGeneralStakingData({
				owner: stakingRead[0],
				totalStakedToken: tokencoming(stakingRead[1]),
				totalStakers: +stakingRead[2],
				totalUnStakedTokens: tokencoming(stakingRead[3]),
				totalWithdrawanTokens: tokencoming(stakingRead[4]),
				totalClaimedRewardToken: tokencoming(stakingRead[5]),
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stakingRead]);

	return (
		<>
			<GeneralStakingDetails generalStakingData={generalStakingData} />
			<StakingPlanDetails stakingContract={stakingContract} />
			<StakingUserData />
		</>
	);
};

export default Staking;
