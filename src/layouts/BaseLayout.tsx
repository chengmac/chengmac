import React, { Fragment, PureComponent } from 'react';
import Cookies from 'js-cookie';
import config from '@/utils/config';
import { queryLayout } from '@/utils';
import LandingLayout from './LandingLayout';
import { enquireScreen } from 'enquire-js';
import { AppModelState, connect } from 'umi';
import { Layout } from 'antd';

class BaseLayout extends PureComponent {
  state = {
    isMobile: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'app/updateState',
      payload: {
        minHeight: document.body.clientHeight - 80,
      },
    });
    enquireScreen((mobile: boolean) => {
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          isMobile: mobile ? mobile : false,
        },
      });
    });
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    enquireScreen((mobile: boolean) => {
      this.props.dispatch({
        type: 'app/updateState',
        payload: {
          isMobile: mobile ? mobile : false,
        },
      });
    });
  }

  render() {
    const Layouts: object = {
      Landing: LandingLayout,
    };
    const { children } = this.props;
    let layout = queryLayout(config.layouts, location.pathname);
    console.log(layout);
    let Containner = Layouts[layout];
    return (
      <Fragment>
        <Containner>{children}</Containner>
      </Fragment>
    );
  }
}
export default connect(({ app }: { app: AppModelState }) => ({
  app,
}))(BaseLayout);
