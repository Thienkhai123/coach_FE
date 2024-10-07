import { ITranslation } from '@/interfaces/ITranslation';
import React, { Fragment, useState } from 'react';

import CheckOrderFormMobile from '@/components/form/check-Order-Form/checkOrderFormMobile';
import FullScreenModal from '@/components/modal/FullScreenModal';
import useModal from '@/hook/useModal';
import { IGetShippingOrderDetail } from '@/interfaces/httpRequest/IShipment';
import { fetchShippingOrder } from '@/apis/searchOrder';
import { isEmpty } from 'lodash';
import NavbarAction from '@/components/navbar/action';
import ModalDetailOrderMobile from '@/components/Pages/tra-cuu-don-hang/modalDetailOrderMobile';
import NotFoundPackages from '@/components/Pages/tra-cuu-don-hang/notFoundPackages';
import LoadingView from '@/components/LoadingView';

interface IContainerSearchMobileProps {
  translation: ITranslation;
}

const ContainerSearchMobile = (props: IContainerSearchMobileProps) => {
  const { translation } = props;

  const [openFullScreen, toggleFullScreen] = useModal();
  const [openFullScreenErrorNotFound, toggleFullScreenNotFound] = useModal();
  const [dataOrderDetail, setDataOrderDetail] = useState<any>({});
  const [dataModalDetail, setModalDetail] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoHome = () => {
    window.location.assign('/');
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const params = {
      phoneNumber: data?.phone,
      shippingOrderCode: data?.code,
    };
    const res: IGetShippingOrderDetail = await fetchShippingOrder(params);
    if (res?.code === 200 && !isEmpty(res.data)) {
      const dataOld = res?.data;
      // packages detail
      const productDetail: any = [];
      dataOld?.packages?.forEach((element: any) => {
        const { content, width, length, height } = element?.packageMetadata;
        const { weightDisplay = '-', dimensionDisplay = '-' } =
          element?.shipmentCostInfo || {};

        const data = {
          productId: element?.shippingOrderId,
          codeProduct: dataOld?.shippingOrderCode
            ? dataOld?.shippingOrderCode.replace('#', '')
            : '-',
          content: content,
          weight: weightDisplay,
          size: dimensionDisplay,
          collector:
            dataOld?.codAmount > 0
              ? dataOld?.codAmount.toLocaleString() + ' ' + 'đ'
              : translation?.SEARCHING.ankNo,
        };
        productDetail?.push(data);
      });
      const constomData = {
        codeOrder: dataOld?.shippingOrderCode,
        createAt: dataOld?.createdAt,
        statuFee:
          dataOld?.shippingFeeStatusDisplay === 'Chưa thanh toán'
            ? translation.ORDER.statusUnpaid
            : translation.ORDER.statusPaid,
        orderStatusDisplay:
          dataOld?.trackingShippingStatuses[
            dataOld?.trackingShippingStatuses?.length - 1
          ]?.statusDisplay,
        incentivesPay: 0, // ưu đải
        totalFee: dataOld?.shippingFee,
        informationPerson: {
          fullName: dataOld?.senderInfo?.senderName,
          phone: dataOld?.senderInfo?.senderPhone,
          CCCD: dataOld?.senderInfo?.senderCI,
          city: dataOld?.loadingLocation?.cityName,
          address: dataOld?.senderInfo?.senderAddress,
          createAt: dataOld?.createdAt,
          fullNameReceive: dataOld?.receiverInfo?.receiverName,
          phoneReceive: dataOld?.receiverInfo?.receiverPhone,
          CCCDReceive: dataOld?.receiverInfo?.receiverCI,
          cityReceive: dataOld?.unloadingLocation?.cityName,
          addressReceive: dataOld?.receiverInfo?.receiverAddress,
        },
        productList: productDetail,
      };
      // Modal Detail
      const shippingProcess: any = [];
      dataOld?.trackingShippingStatuses?.forEach((element: any) => {
        const data = {
          id: 6,
          createAt: new Date(),
          statusDone: false,
          statusDisplayOrder:
            'Đơn hàng đang đến kho...Nội Bài, Sóc Sơn, Hà Nội',
          statusFirstOrder: 1,
        };
        shippingProcess?.push(data);
      });
      const customModalDetail = {
        createAt: dataOld?.trackingShippingStatuses[length - 1]?.createdAt, // thời gian dự kiến
        code: dataOld?.shippingOrderCode,
        statusDisplay: '', // Trạng thái vận chuyển
        shippingProcess: shippingProcess,
      };
      setModalDetail(customModalDetail);
      setDataOrderDetail(constomData);
      toggleFullScreen();
    }
    if (res?.code === 400) {
      toggleFullScreenNotFound();
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {loading && <LoadingView />}
      {!loading && (
        <>
          <CheckOrderFormMobile onSubmit={onSubmit} translation={translation} />
          <FullScreenModal open={openFullScreen}>
            <NavbarAction
              title={translation.ORDER.order + ' ' + dataOrderDetail.codeOrder}
              ActionElement={() => <></>}
              // subTitle={selectedOption?.value}
              handleClick={toggleFullScreen}
            />
            <div>
              <ModalDetailOrderMobile
                {...dataOrderDetail}
                translation={translation}
                handleGoHome={handleGoHome}
              />
            </div>
          </FullScreenModal>
          <FullScreenModal open={openFullScreenErrorNotFound}>
            <NavbarAction
              title={translation.ORDER.order}
              ActionElement={() => <></>}
              // subTitle={selectedOption?.value}
              handleClick={toggleFullScreenNotFound}
            />
            <NotFoundPackages
              translation={translation}
              handleGoHome={handleGoHome}
            />
          </FullScreenModal>
        </>
      )}
    </Fragment>
  );
};

export default ContainerSearchMobile;
