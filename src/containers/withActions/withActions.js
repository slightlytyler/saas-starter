import connect from 'common/redux/connect';

const withActions = creators => connect({ mapDispatchToProps: creators });

export default withActions;
