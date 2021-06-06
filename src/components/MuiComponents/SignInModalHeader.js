import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const headerStyles = makeStyles((theme) => ({
	titleSpacing: {
		marginTop: "2rem",
		marginBottom: "0.5rem",
	},
	subTitleSpacing: {
		marginTop: "1rem",
		textAlign: "center",
	},
}));

function SignInModalHeader(props) {
	const theme = useTheme();
	const classes = headerStyles(theme);

	return (
		<Grid
			container
			item
			xs={12}
			justify="center"
			alignItems="center"
			direction="column"
		>
			<Grid item>
				<Typography variant="h3" className={classes.titleSpacing}>
					{props.title}
				</Typography>
			</Grid>

			<Grid item xs={7}>
				<Typography variant="body2" className={classes.subTitleSpacing}>
					{props.subTitle}
				</Typography>
			</Grid>
		</Grid>
	);
}

export default SignInModalHeader;
