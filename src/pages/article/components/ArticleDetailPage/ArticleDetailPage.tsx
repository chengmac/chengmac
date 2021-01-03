import React, { Fragment, PureComponent } from 'react';
import styles from './ArticleDetailPage.less';
import Section from '@/components/Section/Section';
import HeroImage from '@/components/HeroImage/HeroImage';
import { Row, Col, Typography } from 'antd';
import { Parser } from 'html-to-react';
import ArticleMetaInfo from '../ArticleMetaInfo/ArticleMetaInfo';

const HtmlToReactParser = new Parser();
class ArticleDetailPage extends PureComponent {
  render() {
    const { articleDetail, isMobile } = this.props;
    const content = HtmlToReactParser.parse(articleDetail.content);

    return (
      <Fragment>
        <Section className={styles.containner}>
          <Row>
            <Col span={18} className={styles.detailPage}>
              <div className={styles.detailPageWrap}>
                <Typography.Title level={4}>
                  {articleDetail.title}
                </Typography.Title>
                <ArticleMetaInfo
                  article={articleDetail}
                  dateFormat={'LL'}
                  className={styles.metaInfo}
                />
                <HeroImage
                  source={true}
                  isOrigin={!articleDetail.type}
                  src={articleDetail.heroImage}
                  className={styles.heroImageSize}
                  sourceStyle={styles.sourceStyle}
                />
                <div className={styles.artileContent}>{content}</div>
              </div>
            </Col>
            <Col span={6}></Col>
          </Row>
        </Section>
      </Fragment>
    );
  }
}
export default ArticleDetailPage;
