"use client";
import { fetchTicketInfo } from "@/apis/trip";
import LoadingView from "@/components/LoadingView";
import ContainerRequestPaymentDesktop from "@/container/cho-xac-nhan-thanh-toan/desktop";
import ContainerRequestPaymentMobile from "@/container/cho-xac-nhan-thanh-toan/mobile";
import { useCustomToast } from "@/hook/useToast";
import useTrans from "@/hook/useTrans";
import { IRequestPaymentTranslate } from "@/interfaces/IRequestPaymentTranslate";
import {
	ITicketInfoData,
	ITicketInfoResponse,
} from "@/interfaces/httpRequest/ITrip";
import { IUserProfile } from "@/interfaces/httpRequest/IUser";
import withCommon from "@/layout/withCommon";
import { useEffect, useState } from "react";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Image from "next/image";

const RequestPaymentPage = ({ userProfile }: { userProfile: IUserProfile }) => {
	const {
		REQUESTPAYMENT,
	}: {
		REQUESTPAYMENT: IRequestPaymentTranslate;
	} = useTrans();

	const [phone, setPhone] = useState<string | null>(null);
	const [code, setCode] = useState<string | null>(null);
	const [ticketInfo, setTicketInfo] = useState<ITicketInfoData>();
	const [ticketInfoReturn, setTicketInfoReturn] = useState<ITicketInfoData>();

	const [isLoading, setLoading] = useState(false);
	const { toastError } = useCustomToast();

	const getTicketInfo = async ({
		phone,
		code,
	}: {
		phone: string;
		code: string;
	}) => {
		setLoading(true);
		if (phone && code) {
			const res: ITicketInfoResponse = await fetchTicketInfo({
				phone: phone,
				code: code,
			});
			if (res?.isSuccess) {
				setTicketInfo(res?.data);
				setLoading(false);
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "infoTicket-errors",
				});
			}
		}
	};
	const getTicketInfoReturn = async ({
		phone,
		code,
	}: {
		phone: string;
		code: string;
	}) => {
		setLoading(true);
		if (phone && code) {
			const res: ITicketInfoResponse = await fetchTicketInfo({
				phone: phone,
				code: code,
			});
			if (res?.isSuccess) {
				setTicketInfoReturn(res?.data);
				setLoading(false);
			} else {
				setLoading(false);
				toastError({
					message: res?.errorMessage,
					toastId: "infoTicket-errors",
				});
			}
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const phoneParam = params.get("phone");
		const codeParam = params.get("code");
		const codeReturnParam = params.get("codeReturn");

		if (phoneParam && codeParam) {
			if (codeReturnParam) {
				getTicketInfoReturn({
					code: codeReturnParam,
					phone: phoneParam,
				});
			}

			setCode(codeParam);
			setPhone(phoneParam);
			getTicketInfo({ code: codeParam, phone: phoneParam });
		}

		// params.delete("phone");
		// params.delete("code");
		// window.history.replaceState(
		// 	{},
		// 	"",
		// 	`${window.location.pathname}?${params.toString()}`,
		// );
	}, []);
	if (!ticketInfo) {
		return (
			<div className='min-h-[100vh] relative flex flex-col'>
				{isLoading && <LoadingView />}
				<div className='lg:block hidden'>
					<Header userProfile={userProfile} />
				</div>
				<div className='lg:hidden block'>
					<Header
						backgroundColorMobile='linear-gradient(90.4deg, #DF5030 -0.55%, #BE3C2A 72.71%)'
						userProfile={userProfile}
					/>
				</div>
				<div className='flex-1 flex items-center justify-center p-10 lg:px-0 px-4'>
					<div className='bg-white p-6 rounded-xl flex flex-col gap-4 justify-center items-center lg:w-[600px] w-full'>
						<div className='relative w-[200px] h-[200px]'>
							<Image
								alt=''
								src='/images/empty-trip-desktop.png'
								layout='fill'
								quality={100}
							/>
						</div>
						<div className='flex flex-col gap-0.5 items-center'>
							<p className='text-center text-base font-semibold text-neutral-grey-700'>
								{REQUESTPAYMENT.detailOrder.notFoundTitle}
							</p>
							<p className='text-center text-sm font-medium text-neutral-grey-600'>
								{REQUESTPAYMENT.detailOrder.notFoundContent}
							</p>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
	return (
		<main className='min-h-[100vh] relative flex flex-col'>
			{isLoading && <LoadingView />}
			<div className='flex-1 bg-neutral-grey-100'>
				<div className='lg:block hidden'>
					<ContainerRequestPaymentDesktop
						REQUESTPAYMENT={REQUESTPAYMENT}
						ticketInfo={ticketInfo}
						ticketInfoReturn={ticketInfoReturn}
						userProfile={userProfile}
					/>
				</div>

				<div className='lg:hidden block'>
					{Object?.keys(ticketInfo)?.length > 0 && (
						<ContainerRequestPaymentMobile
							REQUESTPAYMENT={REQUESTPAYMENT}
							ticketInfo={ticketInfo}
							userProfile={userProfile}
							ticketInfoReturn={ticketInfoReturn}
						/>
					)}
				</div>
			</div>
		</main>
	);
};
export default withCommon(RequestPaymentPage);
