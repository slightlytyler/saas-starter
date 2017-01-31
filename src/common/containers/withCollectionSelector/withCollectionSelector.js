import connect from 'common/redux/connect';

const withCollectionSelector = (selectCollectionByQuery, selectQuery) => connect({
  mapStateToProps: {
    collection: (state, props) => selectCollectionByQuery(state, selectQuery(props)),
  },
});

export default withCollectionSelector;
