import locationPropType from 'common/propTypes/location';
import { Divider, Paper } from 'material-ui';
import React, { PropTypes } from 'react';
import { Box, Flex } from 'react-layout-components';
import { withRouter } from 'react-router-dom';
import Header from './SidebarHeader';
import PrimaryNav from './SidebarPrimaryNav';
import SecondaryNav from './SidebarSecondaryNav';

const Sidebar = ({ push, location }) => (
  <Box className="Sidebar" column>
    <Paper className="Sidebar__wrapper" zDepth={1}>
      <Flex column fit>
        <Header onTouchTap={() => push('/')} />
        <Flex>
          <PrimaryNav push={push} url={location.pathname} />
        </Flex>
        <Divider />
        <SecondaryNav push={push} url={location.pathname} />
      </Flex>
    </Paper>
  </Box>
);

Sidebar.propTypes = {
  location: locationPropType.isRequired,
  push: PropTypes.func.isRequired,
};

export default withRouter(Sidebar);
