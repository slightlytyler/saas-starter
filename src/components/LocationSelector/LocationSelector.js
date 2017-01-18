import connect from 'common/redux/connect';
import selectLocation from 'common/selectors/selectLocation';

const LocationSelector = ({ location, children }) => children({ location });

const container = connect({
  mapStateToProps: { location: selectLocation },
});

export { LocationSelector as component, container };

export default container(LocationSelector);
