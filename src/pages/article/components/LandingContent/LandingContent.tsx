import React, { Fragment, PureComponent } from 'react';
import styles from './LandingContent.less';
import { Redirect } from 'umi';
import { Row, Col } from 'antd';
import LandingLeftColumn from './LandingLeftColumn/LandingLeftColumn';
import LandingRightColumn from './LandingRightColumn/LandingRightColumn';

class LandingContent extends PureComponent {
  render() {
    const { app, articleList } = this.props;
    const { isMobile } = app;
    return (
      <Fragment>
        {!isMobile ? (
          <Row>
            <Col span={18} className={styles.landingLeftColumn}>
              <LandingLeftColumn
                isMobile={isMobile}
                articleList={articleList}
              />
            </Col>
            <Col span={6}>
              <LandingRightColumn />
            </Col>
          </Row>
        ) : (
          <Row>
            <LandingLeftColumn isMobile={isMobile} articleList={articleList} />
          </Row>
        )}
      </Fragment>
    );
  }
}

export default LandingContent;
