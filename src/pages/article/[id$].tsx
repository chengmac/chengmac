import React, { Fragment, PureComponent } from 'react';
import styles from './index.less';
import ArticleDetailPage from './components/ArticleDetailPage/ArticleDetailPage';
import Section from '@/components/Section/Section';
import { connect, AppModelState, ArticleModelState } from 'umi';
import { Helmet } from "react-helmet";

class ArticleDetail extends PureComponent {
  render() {
    const { app, article } = this.props;
    const { isMobile, minHeight } = app;
    const { articleDetail } = article;
    const label = articleDetail.label && articleDetail.label.join(',');
    return (
      <Fragment>
        <Helmet>
          <title>{articleDetail.title}</title>
          <meta name="Keywords" content={label}/>
          <meta name="description" content={articleDetail.subtitle}/>
        </Helmet>
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
