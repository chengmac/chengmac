import React, { Fragment, PureComponent } from 'react';
import styles from './ArticleListCard.less';
import { Row, Typography, Skeleton, Card } from 'antd';
import HeroImage from '@/components/HeroImage/HeroImage';
import ArticleMetaInfo from '../ArticleMetaInfo/ArticleMetaInfo';
import { NavLink, history } from 'umi';
import _ from 'lodash';
import { Parser } from 'html-to-react';

const HtmlToReactParser = new Parser();
const { Text, Paragraph } = Typography;
class ArticleListCard extends PureComponent {
  render() {
    const { isMobile, article } = this.props;
    const description = HtmlToReactParser.parse(article.content);
    return (
      <Fragment>
        <Card className={styles.articleListCard} bodyStyle={{ padding: 0 }}>
          {!isMobile ? (
            article && _.isEmpty(article) ? (
              <Skeleton
                active
                avatar={{ shape: 'square', size: 120 }}
              ></Skeleton>
            ) : (
              <Row>
                <HeroImage
                  src={article.heroImage}
                  source={true}
                  isOrigin={!article.type}
                  onClick={() => {
                    history.push({
                      pathname: `/article/${article.articleId}`,
                    });
                  }}
                  sm
                />
                <div className={styles.contentWrap}>
                  <NavLink to={`/article/${article.articleId}`}>
                    <Paragraph className={styles.title}>
                      {article.title}
                    </Paragraph>
                  </NavLink>
                  <Paragraph className={styles.description} ellipsis>
                    {article.subtitle}
                  </Paragraph>
                  <ArticleMetaInfo
                    article={article}
                    dateFormat={'YYYY-MM-DD'}
                  />
                </div>
              </Row>
            )
          ) : article && _.isEmpty(article) ? (
            <Skeleton active avatar={{ shape: 'square', size: 50 }}></Skeleton>
          ) : (
            <Row>
              <HeroImage
                src={article.heroImage}
                source={true}
                isOrigin={!article.type}
                onClick={() => {
                  history.push({
                    pathname: `/article/${article.articleId}`,
                  });
                }}
                sourceStyle={styles.sourceStyle}
                className={styles.heroImageSize}
              />
              <div className={styles.mobileContentWrap}>
                <NavLink to={`/article/${article.articleId}`}>
                  <Paragraph className={styles.title}>
                    {article.title}
                  </Paragraph>
                </NavLink>
                <Paragraph className={styles.description} ellipsis>
                  {article.subtitle}
                </Paragraph>
                <ArticleMetaInfo article={article} dateFormat={'YYYY-MM-DD'} />
              </div>
            </Row>
          )}
        </Card>
      </Fragment>
    );
  }
}

export default ArticleListCard;
