import stakingABI from "../../contract/StakingABI.json";
import Environment from "../../contract/environment";

const stakeContract = {
	addressOrName: Environment.StakingAddress,
	contractInterface: stakingABI,
};

export const callingFunction = () => {
	let Duration = [];
	let Bonus = [];
	let StakedPerPlan = [];
	let StakersPerPlan = [];

	//   map for each index
	for (let index = 0; index < 5; index++) {
		Duration.push({
			...stakeContract,
			functionName: "Duration",
			args: [index],
		});
		Bonus.push({
			...stakeContract,
			functionName: "Bonus",
			args: [index],
		});
		StakedPerPlan.push({
			...stakeContract,
			functionName: "totalStakedPerPlan",
			args: [index],
		});
		StakersPerPlan.push({
			...stakeContract,
			functionName: "totalStakersPerPlan",
			args: [index],
		});
	}

	return {
		Duration: Duration,
		Bonus: Bonus,
		StakedPerPlan: StakedPerPlan,
		StakersPerPlan: StakersPerPlan,
	};
};
