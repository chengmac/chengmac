import React, { Fragment, PureComponent } from 'react';
import styles from './LandingContent.less';
import { Row, Col } from 'antd';
import LandingLeftColumn from './LandingLeftColumn/LandingLeftColumn';

class LandingContent extends PureComponent {
  render() {
    const { app, dispatch, loading } = this.props;
    const { isMobile, labelList, articleList, currentMuisc, muiscIdList } = app;
    return (
      <Fragment>
        <LandingLeftColumn isMobile={isMobile} articleList={articleList} />
      </Fragment>
    );
  }
}

export default LandingContent;
