import Logo from 'components/Logo';
import Panel from 'components/Panel';
import SmallContainer from 'components/SmallContainer';
import { map, size } from 'lodash/fp';
import React, { PropTypes } from 'react';
import { Box, Page } from 'react-layout-components';
import { Link } from 'react-router';

const renderAlternateMessagesIteratee = message => (
  <Link className="AuthLayout__alternate-message" key={message.prompt} to={message.pathname}>
    {message.prompt}
  </Link>
);

const renderAlternateMessages = messages => (
  size(messages)
    ? map(renderAlternateMessagesIteratee, messages)
    : null
);

const AuthLayout = ({ alternateMessages, children, title }) => (
  <Page>
    <Box center className="AuthLayout" fit>
      <SmallContainer marginBottom="20%">
        <Box alignItems="center" column fit>
          <header className="AuthLayout__header">
            <section className="AuthLayout__header__primary">
              <Logo className="AuthLayout__header__primary__logo" />
            </section>
            <section className="AuthLayout__header__secondary">{title}</section>
          </header>
          <Panel>{children}</Panel>
          <Box center column>
            {renderAlternateMessages(alternateMessages)}
          </Box>
        </Box>
      </SmallContainer>
    </Box>
  </Page>
);

AuthLayout.propTypes = {
  alternateMessages: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      prompt: PropTypes.string.isRequired,
    }),
  ),
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default AuthLayout;
