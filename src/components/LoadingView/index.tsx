import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import * as animationData from "./loading-bus.json";

const LottieAnimation = React.memo(() => (
	<Lottie animationData={animationData} loop={true} />
));

const LoadingView = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);
	if (!isClient) {
		return null;
	}

	return (
		<div className='w-[100vw] h-[100vh] p-2 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]'>
			<div
				role='status'
				className='w-52 h-52 bg-white flex items-center justify-center rounded-full overflow-hidden'>
				<LottieAnimation />
			</div>
		</div>
	);
};

export default LoadingView;
