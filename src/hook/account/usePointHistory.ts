import { fetchHistoriesPoints } from "@/apis/user";
import {
	IHistoriesPoints,
	IHistoryPointResponse,
} from "@/interfaces/httpRequest/IPoints";
import { useState } from "react";

const useHistoriesPoints = () => {
	const [historiesPoint, setHistoriesPoint] = useState<IHistoriesPoints>([]);
	const [loading, setLoading] = useState(false);

	const handleGetHistoriesPoints = async () => {
		setLoading(true);
		const res: IHistoryPointResponse = await fetchHistoriesPoints();
		if (res?.data?.length > 0) {
			setHistoriesPoint(res?.data);
		}
		setLoading(false);
	};

	return {
		historiesPoint,
		loading,
		handleGetHistoriesPoints,
	};
};

export default useHistoriesPoints;
