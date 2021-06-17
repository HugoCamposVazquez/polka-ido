import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps: any) {
    // @ts-ignore
    if (this.props.location !== prevProps.location) {
      // eslint-disable-next-line no-undef
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

// @ts-ignore
export default withRouter(ScrollToTop);
