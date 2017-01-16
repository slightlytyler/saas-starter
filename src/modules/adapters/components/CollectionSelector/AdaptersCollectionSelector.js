import CollectionSelector from 'components/CollectionSelector';
import { selectCollectionByQuery } from 'modules/adapters/selectors';
import React, { PropTypes } from 'react';

const AdaptersCollectionSelector = ({ children, query }) => (
  <CollectionSelector query={query} selector={selectCollectionByQuery}>
    {children}
  </CollectionSelector>
);

AdaptersCollectionSelector.propTypes = {
  children: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
};

export default AdaptersCollectionSelector;
