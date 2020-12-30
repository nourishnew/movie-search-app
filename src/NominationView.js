import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useGetMovie from "./hooks/useGetMovie";
import useDeleteNomination from "./hooks/useDeleteNomination";
import { useSnackbar } from "notistack";
import { Button, makeStyles, fade } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 345,
		marginTop: "20px",
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(3),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
	scroll: {
		overflowY: "auto",
		"&::-webkit-scrollbar": {
			width: "3px",
		},
		"&::-webkit-scrollbar-track": {
			"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: "rgba(0,0,0,.1)",
			borderRadius: "2px",
		},
	},
}));

export default function NominationView({ userId, id, refetch }) {
	const { enqueueSnackbar } = useSnackbar();

	const [deleteNomination] = useDeleteNomination();
	const { data, isLoading } = useGetMovie(id);
	function handleDeleteNomination(id) {
		enqueueSnackbar("Removing from nomination List. Please wait");

		deleteNomination(
			{
				userId: userId,
				movieId: id,
			},
			{
				onSuccess: ({ data }) => {
					refetch();
					enqueueSnackbar("Movie has been removed from your nomination list", {
						variant: "success",
					});
				},
			},
			{
				onError: ({ data }) => {
					refetch();
					enqueueSnackbar("Couldn't remove from nomination. Please try again", {
						variant: "error",
					});
				},
			}
		);
	}

	const classes = useStyles();
	return (
		<div>
			{isLoading || !data ? (
				<Skeleton variant="rect" width={210} height={300} />
			) : (
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							component="img"
							alt="Contemplative Reptile"
							height="350"
							image={data.Poster}
							title="Contemplative Reptile"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="h2">
								{data.Title}
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								{data.Year}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleDeleteNomination(data.imdbID)}
						>
							Remove
						</Button>
					</CardActions>
				</Card>
			)}
		</div>
	);
}
