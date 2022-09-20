import React, { useState } from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import NetworkHandle from "./components/NetworkHandle";
import Loading from "./components/Loading";

function App() {
	const [openBackdrop, setOpenBackdrop] = useState(false);

	return (
		<>
			<ToastContainer />
			<NetworkHandle setOpenBackdrop={setOpenBackdrop} />
			<Loading openBackdrop={openBackdrop} />
			<Header />
			<Home setOpenBackdrop={setOpenBackdrop} />
		</>
	);
}

export default App;
