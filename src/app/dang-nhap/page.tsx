"use client";
import ContainerSignInDesktop from "@/container/dang-nhap/desktop";
import ContainerSignInMobile from "@/container/dang-nhap/mobile";
import withGuest from "@/layout/withGuest";
import "../globals.css";

const SignInPage = () => {
	return (
		<main className='min-h-[100vh] relative flex flex-col'>
			<div className='flex-1 h-full lg:bg-neutral-grey-100 bg-white'>
				<div className='lg:block hidden lg:h-screen'>
					<ContainerSignInDesktop defaultTab={1} />
				</div>

				<div className='lg:hidden block'>
					<ContainerSignInMobile />
				</div>
			</div>
		</main>
	);
};

export default withGuest(SignInPage);
