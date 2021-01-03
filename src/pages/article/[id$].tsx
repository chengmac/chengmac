import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import ArticleDetailPage from './components/ArticleDetailPage/ArticleDetailPage';
import Section from '@/components/Section/Section';
import { connect, AppModelState, ArticleModelState } from 'umi';

class ArticleDetail extends PureComponent {
  render() {
    const { app, article } = this.props;
    const { isMobile, minHeight } = app;
    console.log(article)
    return (
      <Fragment>
        <Section style={{minHeight: minHeight}}>
          <ArticleDetailPage
            articleDetail={article.articleDetail}
            isMobile={isMobile}
          />
        </Section>
      </Fragment>
    );
  }
}
export default connect(
  ({ app, article }: { app: AppModelState, article: ArticleModelState }) => ({
    app, article
  }),
)(ArticleDetail);
