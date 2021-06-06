import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const footerStyles = makeStyles((theme) => ({
	footer: {
		border: "1px solid #e2e2ea",
		marginTop: "3rem",
		padding: "2rem 3rem 2rem 3rem",
	},
	primaryLight: {
		color: `${theme.palette.primary.light}`,
	},
	secondary: {
		color: `${theme.palette.secondary.main}`,
	},
}));

function SignInModalBottom(props) {
	const theme = useTheme();
	const classes = footerStyles(theme);

	return (
		<Grid
			container
			item
			xs={12}
			className={classes.footer}
			justify="center"
			alignItems="center"
		>
			<Grid item>
				<Typography
					variant="body1"
					component="span"
					className={classes.primaryLight}
				>
					{props.primaryText}{" "}
				</Typography>

				<Link to={props.link}>
					<Typography
						variant="body1"
						color="secondary"
						component="span"
					>
						{props.secondaryText}
					</Typography>
				</Link>
			</Grid>
		</Grid>
	);
}

export default SignInModalBottom;
