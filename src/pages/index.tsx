import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import LandingContent from '@/pages/article/components/LandingContent/LandingContent';
import Section from '@/components/Section/Section';
import { connect, AppModelState } from 'umi';

class IndexPage extends PureComponent {
  render() {
    const { app } = this.props;
    const { articleList, minHeight, isMobile } = app;
    return (
      <Fragment>
        <Section
          className={styles.containner}
          style={{ minHeight: minHeight, paddingTop: isMobile ? 10 : 20 }}
        >
          <LandingContent articleList={articleList} app={app} />
        </Section>
      </Fragment>
    );
  }
}
export default connect(({ app }: { app: AppModelState }) => ({
  app,
}))(IndexPage);
