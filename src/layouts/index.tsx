import React, { Fragment, PureComponent } from 'react';
import BaseLayout from './BaseLayout';
import { ConfigProvider } from 'antd';

class IndexLayout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <ConfigProvider prefixCls={'mc'}>
          <BaseLayout>{children}</BaseLayout>
        </ConfigProvider>
      </Fragment>
    );
  }
}
export default IndexLayout;
