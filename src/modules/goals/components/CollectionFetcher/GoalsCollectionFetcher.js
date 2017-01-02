import React, { Component, PropTypes } from 'react';
import { compose, get, has, size } from 'lodash/fp';
import { connect } from 'react-redux';
import qs from 'qs';
import { fetchCollection } from 'modules/goals/actions';

export class GoalsCollectionFetcher extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    fetchCollection: PropTypes.func.isRequired,
    goalsCollection: PropTypes.shape({
      ids: PropTypes.arrayOf(PropTypes.string).isRequired,
      loading: PropTypes.bool.isRequired,
      params: PropTypes.object.isRequired,
      timestamp: PropTypes.string.isRequired,
    }),
  };

  componentWillMount() {
    this.props.fetchCollection();
  }

  render() {
    const hasGoalsCollection = has('goalsCollection', this.props);
    const hasGoalsItems = compose(size, get('goalsCollection.ids'))(this.props);
    const isLoadingGoalsCollection = !hasGoalsItems && get('goalsCollection.loading', this.props);
    if (!hasGoalsCollection || isLoadingGoalsCollection) {
      return <div>Loading...</div>;
    }
    return this.props.children({
      fetchCollection: this.props.fetchCollection,
      goalsCollection: this.props.goalsCollection,
    });
  }
}

const findCollection = (state, params = {}) => state.goals.collections[qs.stringify(params) || 'root'];

export default connect(
  state => ({
    goalsCollection: findCollection(state),
  }),
  { fetchCollection },
)(GoalsCollectionFetcher);
