import { useState } from "react";

type InforSenderT = {
  fullName: string;
  phone: string;
  indentify: string;
  email: string;
  address: string;
};

type LocationsT = {
  from: string;
  fromId: number;
  to: string;
  toId: number;
  startPlace: number;
  endPlace: number;
  fromPlace: string;
  toPlace: string;
};

type PayerInforT = {
  payer: number;
  collection: boolean;
  values: number;
  totalCost: number;
};

type ProductionT = {
  content: string;
  pickupImageFile: string;
  packageTypeId: number;
  packageWeightId: number;
  packageDimensionId: number;
  cost: number;
  typeName: string;
  weightName: string;
  sizeName: string;
};

interface ITransportState {
  sender: InforSenderT;
  receiver: InforSenderT;
  locations: LocationsT;
  productions: ProductionT[];
  fees: PayerInforT;
}

const useTransport = () => {
  const [transportState, setTransportState] = useState<ITransportState>({
    sender: {
      fullName: "",
      phone: "",
      indentify: "",
      email: "",
      address: "",
    },
    receiver: {
      fullName: "",
      phone: "",
      indentify: "",
      email: "",
      address: "",
    },
    locations: {
      from: "",
      fromId: 0,
      to: "",
      toId: 0,
      startPlace: 0,
      endPlace: 0,
      fromPlace: "",
      toPlace: "",
    },
    productions: [],
    fees: {
      payer: 0,
      collection: false,
      values: 0,
      totalCost: 0,
    },
  });

  const handleUpdateSenderInformation = (infor: InforSenderT) => {
    setTransportState({
      ...transportState,
      sender: infor,
    });
  };

  const handleUpdateReceiverInformation = (infor: InforSenderT) => {
    setTransportState({
      ...transportState,
      receiver: infor,
    });
  };

  const handleUpdateLocationAndPayerInfor = ({
    locations,
    payerInfor,
  }: {
    locations: LocationsT;
    payerInfor: PayerInforT;
  }) => {
    setTransportState({
      ...transportState,
      locations: locations,
      fees: {
        ...transportState.fees,
        ...payerInfor,
      },
    });
  };

  const handleUpdateProductions = (prods: ProductionT[]) => {
    let tmpTotalCost = 0;
    prods?.forEach((prod) => {
      tmpTotalCost += prod?.cost || 0;
    });
    setTransportState({
      ...transportState,
      productions: prods,
      fees: {
        ...transportState.fees,
        totalCost: tmpTotalCost,
      },
    });
  };

  return {
    transportState,
    handleUpdateSenderInformation,
    handleUpdateReceiverInformation,
    handleUpdateLocationAndPayerInfor,
    handleUpdateProductions,
  };
};

export default useTransport;
