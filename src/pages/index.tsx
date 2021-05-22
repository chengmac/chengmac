import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import LandingContent from '@/pages/article/components/LandingPage/LandingContent';
import Section from '@/components/Section/Section';
import { connect, AppModelState } from 'umi';
import { Helmet } from 'react-helmet';

class IndexPage extends PureComponent {
  render() {
    const { app, dispatch, loading } = this.props;
    const { minHeight, isMobile } = app;
    return (
      <Fragment>
        <Helmet>
          <title>的佛挡杀佛的发</title>
        </Helmet>
        {/* <Section
          className={styles.containner}
          style={{ minHeight: minHeight, paddingTop: isMobile ? 10 : 20 }}
        > */}
        <LandingContent dispatch={dispatch} app={app} loading={loading} />
        {/* </Section> */}
      </Fragment>
    );
  }
}
export default connect(
  ({ app, loading }: { app: AppModelState; loading: any }) => ({
    app,
    loading,
  }),
)(IndexPage);
