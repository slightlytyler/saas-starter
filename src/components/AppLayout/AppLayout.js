import React, { PropTypes } from 'react';
import { Page } from 'react-layout-components';
import Content from './AppLayoutContent';
import Footer from './AppLayoutFooter';
import Header from './AppLayoutHeader';
import Sidebar from './AppLayoutSidebar';

const AppLayout = ({ children }) => (
  <Page>
    <Header />
    <Content>
      <Sidebar />
      {children}
    </Content>
    <Footer />
  </Page>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
