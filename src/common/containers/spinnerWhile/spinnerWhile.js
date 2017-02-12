import PageSpinner from 'common/components/PageSpinner';
import { branch, renderComponent } from 'recompose';

const spinnerWhile = loading => branch(loading, renderComponent(PageSpinner));

export default spinnerWhile;
