import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import tokenABI from "../../contract/TokenABI.json";
import Environment from "../../contract/environment";
import {
	useAccount,
	useContractReads,
	useContractWrite,
	usePrepareContractWrite,
} from "wagmi";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { toast } from "react-toastify";

const tokencoming = (value) => {
	if (value) {
		let token = formatUnits(value.toString()).toString();
		token = parseFloat(token).toFixed(2);
		return token;
	}
};

const tokenContract = {
	addressOrName: Environment.TokenAddress,
	contractInterface: tokenABI,
};

const StakingCalculate = ({ Duration, stakingContract }) => {
	const { address, isConnected } = useAccount();
	const [duration, setDuration] = useState("");
	const [amount, setAmount] = useState(100);
	const [lockedUntil, setLockedUntil] = useState("");

	const { data: tokenRead } = useContractReads({
		contracts: [
			{
				...tokenContract,
				functionName: "allowance",
				args: [address, Environment.StakingAddress],
			},
			{ ...tokenContract, functionName: "balanceOf", args: [address] },
		],
		enabled: isConnected,
	});

	const { config: tokenApprove } = usePrepareContractWrite({
		...tokenContract,
		functionName: "approve",
		args: [Environment.StakingAddress, tokenRead[1]],
	});

	const {
		data: tokenApproved,
		isSuccess: approveSuccess,
		error: approveError,
		isError: approveisError,
		write: approveTokens,
	} = useContractWrite(tokenApprove);

	const { config: tokenStake } = usePrepareContractWrite({
		...stakingContract,
		functionName: "stake",
		args: [parseUnits(amount.toString()).toString(), duration],
	});

	const {
		data: tokenStaked,
		isSuccess: stakeSuccess,
		error: stakeError,
		isError: stakeisError,
		write: stakeTokens,
	} = useContractWrite(tokenStake);

	useEffect(() => {
		if (approveSuccess) toast(tokenApproved);
		if (approveisError) toast(approveError.message);
		if (stakeSuccess) toast(tokenStaked);
		if (stakeisError) toast(stakeError.message);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [approveSuccess, approveisError, stakeSuccess, stakeisError]);

	const handleStake = () => {
		if (amount < 100) toast("Amount is less than 100.");
		else if (duration === "") toast("Select Duration.");
		else stakeTokens();
	};

	const handleDuration = (event) => {
		setDuration(event.target.value);
	};
	const handleAmount = (event) => {
		setAmount(event.target.value);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (duration)
				setLockedUntil(
					dayjs()
						.add(+Duration[duration], "seconds")
						.format("dddd, MMMM D, YYYY h:mm A")
				);
		}, 1000);
		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration]);

	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Box
				sx={{ width: "100%", maxWidth: "600px", textAlign: "center" }}
				my={5}
			>
				<Typography
					sx={{
						fontSize: "2.5rem",
					}}
				>
					Staking Calculator
				</Typography>
			</Box>
			<Box
				sx={{
					width: "100%",
					maxWidth: "600px",
					borderRadius: "40px 0px",
					border: "2px solid #6247AA",
					boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
					transition: "1s all",
					"&:hover": {
						backgroundImage:
							"linear-gradient(to bottom right, #6247AA , #A594F9)",
						boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
						"& .btn": {
							boxShadow: "0px 0px 10px 0px rgba(0,0,0,1)",
						},
					},
				}}
				mb={5}
			>
				<Box px={5} pt={3}>
					<Typography variant="h5" p={1}>
						Enter Tokens:{" "}
					</Typography>
					<FormControl fullWidth p={1}>
						<TextField
							id="outlined-basic"
							placeholder="0.1"
							type="number"
							variant="outlined"
							width="100%"
							value={amount}
							onChange={handleAmount}
							required
						/>
					</FormControl>
				</Box>
				<Box px={5} pt={3}>
					<Typography variant="h5" p={1}>
						Enter Duration:{" "}
					</Typography>

					<FormControl fullWidth p={1}>
						<Select
							displayEmpty
							inputProps={{ "aria-label": "Without label" }}
							value={duration}
							onChange={handleDuration}
							required
						>
							<MenuItem value={""}>Select Duration</MenuItem>
							<MenuItem value={0}>7 Days</MenuItem>
							<MenuItem value={1}>14 Days</MenuItem>
							<MenuItem value={2}>21 Days</MenuItem>
							<MenuItem value={3}>30 Days</MenuItem>
							<MenuItem value={4}>60 Days</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box px={5} pt={3}>
					<Typography variant="h6" p={1}>
						Locked Until: {lockedUntil}
					</Typography>
				</Box>
				<Box px={5} py={3}>
					{amount <= +tokencoming(tokenRead[0]) ? (
						<Button
							className="btn"
							disabled={!isConnected}
							sx={{
								transition: "0.5s all",
								width: "100%",
								height: "55px",
								textAlign: "center",
								cursor: "pointer",
								fontSize: "18px",
								borderRadius: "0px 15px",
								color: "#fff",
								border: "1px solid #6247AA",
								boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
								"&:hover": {
									backgroundImage:
										"linear-gradient(to bottom right, #6247AA , #A594F9)",
								},
							}}
							onClick={handleStake}
						>
							Stake
						</Button>
					) : (
						<Button
							className="btn"
							disabled={!isConnected}
							sx={{
								transition: "0.5s all",
								width: "100%",
								height: "55px",
								textAlign: "center",
								cursor: "pointer",
								fontSize: "18px",
								borderRadius: "0px 15px",
								color: "#fff",
								border: "1px solid #6247AA",
								boxShadow: "0px 0px 10px 0px rgba(165,148,249,0.7)",
								"&:hover": {
									backgroundImage:
										"linear-gradient(to bottom right, #6247AA , #A594F9)",
								},
							}}
							onClick={() => approveTokens()}
						>
							Approve
						</Button>
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default StakingCalculate;
