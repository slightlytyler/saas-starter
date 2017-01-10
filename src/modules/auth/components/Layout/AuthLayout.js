import logo from 'assets/images/logo.png';
import SmallContainer from 'components/layout/SmallContainer';
import Panel from 'components/Panel';
import React, { PropTypes } from 'react';
import { Box } from 'react-layout-components';
import { Link } from 'react-router';

const renderAlternateMessage = message => {
  if (!message) return null;
  return (
    <Link className="AuthLayout__alternate-message" to={message.transitionTo}>
      {message.prompt}
    </Link>
  );
};

const AuthLayout = ({ alternateMessage, children, title }) => (
  <div className="AuthLayout">
    <Box center fit>
      <SmallContainer marginBottom="10%">
        <Box alignItems="center" column fit>
          <header className="AuthLayout__header">
            <section className="AuthLayout__header__primary">
              <img alt="" className="AuthLayout__header__primary__logo" src={logo} />
            </section>
            <section className="AuthLayout__header__secondary">{title}</section>
          </header>
          <Panel>{children}</Panel>
          <Box center>
            {renderAlternateMessage(alternateMessage)}
          </Box>
        </Box>
      </SmallContainer>
    </Box>
  </div>
);

AuthLayout.propTypes = {
  alternateMessage: PropTypes.shape({
    prompt: PropTypes.string.isRequired,
    transitionTo: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;
