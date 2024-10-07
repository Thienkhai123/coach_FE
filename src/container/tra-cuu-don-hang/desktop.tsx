'use client';
import React, { Fragment, useState } from 'react';
import { ITranslation } from '@/interfaces/ITranslation';
import CheckOrderForm from '@/components/form/check-Order-Form';
import OrderDetail from '@/components/Pages/tra-cuu-don-hang/OrderDetail';
import useModal from '@/hook/useModal';
import Modal from '@/components/modal/Modal';
import ModalDetailOrder from '@/components/Pages/tra-cuu-don-hang/modalDetailOrder';
import { IGetShippingOrderDetail } from '@/interfaces/httpRequest/IShipment';
import { isEmpty } from 'lodash';
import { fetchShippingOrder } from '@/apis/searchOrder';
import LoadingView from '@/components/LoadingView';
import NotFoundPackages from '@/components/Pages/tra-cuu-don-hang/notFoundPackages';
interface IContainerSearchDesktop {
  translation: ITranslation;
}

const ContainerSearchDesktop = (props: IContainerSearchDesktop) => {
  const { translation } = props;

  const [Tab, setTab] = useState(1);
  const [openModalDetail, toggleModalDetail] = useModal();
  const [dataOrderDetail, setDataOrderDetail] = useState<any>({});
  const [dataModalDetail, setModalDetail] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleCloseModal = () => {
    toggleModalDetail();
  };

  const handleMoreDetail = () => {
    toggleModalDetail();
  };

  const handleGoHome = () => {
    window.location.assign('/');
  };

  const handleBack = () => {
    setTab(1);
  };

  const handleOnSubmit = async (data: any) => {
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
      setTab(2);
    }
    if (res?.code === 400) {
      setTab(3);
    }
    setLoading(false);
  };

  switch (Tab) {
    case 1:
      return (
        <CheckOrderForm
          translation={translation}
          handleOnSubmit={handleOnSubmit}
        />
      );
    case 2:
      return (
        <>
          {loading && <LoadingView />}
          {!loading && (
            <Fragment>
              <OrderDetail
                {...dataOrderDetail}
                translation={translation}
                handleCloseModal={handleCloseModal}
                handleOpenModalMoreDetail={handleMoreDetail}
                handleGoHome={handleGoHome}
                handleBack={handleBack}
              />
              <Modal
                toggleModal={handleCloseModal}
                open={openModalDetail}
                wrapChildStyle='p-0'
                modalStyle='w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[60] left-[calc(0%)] top-[calc(0%)]'
                childStyle='w-[600px] bg-white md:rounded-xl md:min-h-fit min-h-full mx-0  overflow-hidden duration-200 animate-fade-in '
              >
                <ModalDetailOrder
                  {...dataModalDetail}
                  translation={translation}
                  handleCloseModal={handleCloseModal}
                />
              </Modal>
            </Fragment>
          )}
        </>
      );
    case 3:
      return (
        <>
          {loading && <LoadingView />}
          {!loading && (
            <Fragment>
              <NotFoundPackages
                translation={translation}
                handleGoHome={handleGoHome}
              />
            </Fragment>
          )}
        </>
      );
  }
};

export default ContainerSearchDesktop;
