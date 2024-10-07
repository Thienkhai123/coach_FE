import React, { Fragment } from 'react';
import FooterDesktop from './desktop';
import FooterMobile from './mobile';
import useTrans from '@/hook/useTrans';
import { IFooterTranslate } from '@/interfaces/IFooterTranslate';

const Footer = () => {
  const {
    FOOTER,
  }: {
    FOOTER: IFooterTranslate;
  } = useTrans();

  return (
    <Fragment>
      <div>
        <FooterDesktop FOOTER={FOOTER} />
      </div>
      {/* <div className='lg:hidden block'>
        <FooterMobile />
      </div> */}
    </Fragment>
  );
};

export default Footer;
