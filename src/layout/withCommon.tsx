import { ACCESS_TOKEN } from "@/constant/app";
import { useEffect, useState } from "react";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { fetchUserProfile } from "@/apis/user";
import {
	IUserProfile,
	IUserProfileResponse,
} from "@/interfaces/httpRequest/IUser";
import LoadingView from "@/components/LoadingView";

axios.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem(ACCESS_TOKEN);
	if (!isEmpty(accessToken)) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}
	return config;
});

const withCommon = (Component: any) => {
	return function withCommon(props: any) {
		const [userProfile, setUserProfile] = useState<IUserProfile | null>();

		useEffect(() => {
			// Call API get User Profile
			const handleFetchUserInfo = async () => {
				const accessToken = localStorage.getItem(ACCESS_TOKEN);
				if (accessToken) {
					const res: IUserProfileResponse = await fetchUserProfile();
					if (res.isSuccess) {
						setUserProfile(res.data);
					} else {
						localStorage.clear();
						setUserProfile(null);
					}
				} else {
					setUserProfile(null);
				}
			};
			handleFetchUserInfo();
		}, []);

		if (userProfile === undefined) {
			return (
				<div>
					<LoadingView />
				</div>
			);
		}

		return <Component userProfile={userProfile} />;
	};
};

export default withCommon;