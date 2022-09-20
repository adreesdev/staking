import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StakingUserData = () => {
	return (
		<>
			<Box sx={{ width: "100%", textAlign: "center" }} my={5}>
				<Typography
					sx={{
						fontSize: "2.5rem",
					}}
				>
					Staker's Record
				</Typography>
			</Box>
			<Box
				mb={2}
				p={5}
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
				<TableContainer>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Plan</TableCell>
								<TableCell align="right">Amount</TableCell>
								<TableCell align="right">Reward</TableCell>
								<TableCell align="right">Locked Until</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.name}
									sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">{row.calories}</TableCell>
									<TableCell align="right">{row.fat}</TableCell>
									<TableCell align="right">{row.carbs}</TableCell>
									<TableCell align="right">{row.protein}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default StakingUserData;
