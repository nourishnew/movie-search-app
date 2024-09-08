import "./App.css";
import { SnackbarProvider } from "notistack";
import MovieApp from "./MovieApp";

export default function App() {
	return <Shoppies />;
}

function Shoppies() {
	return (
		<div className="App">
			<SnackbarProvider maxSnack={1}>
				<MovieApp />
			</SnackbarProvider>
		</div>
	);
}
