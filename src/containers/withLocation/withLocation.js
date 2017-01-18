import connect from 'common/redux/connect';
import selectLocation from 'common/selectors/selectLocation';

const withLocation = connect({
  mapStateToProps: { location: selectLocation },
});

export default withLocation;
