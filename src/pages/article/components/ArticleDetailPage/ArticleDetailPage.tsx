import React, { Fragment, PureComponent } from 'react';
import styles from './ArticleDetailPage.less';
import Section from '@/components/Section/Section';
import HeroImage from '@/components/HeroImage/HeroImage';
import ImagePreview from '@/components/ImagePreview/ImagePreview';
import { BackTop, Row, Col, Typography, Skeleton } from 'antd';
import { Parser, ProcessNodeDefinitions } from 'html-to-react';
import ArticleMetaInfo from '../ArticleMetaInfo/ArticleMetaInfo';
import ArticleDirectory from '../ArticleDirectory/ArticleDirectory';
import _ from 'lodash';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
const HtmlToReactParser = new Parser();
const processNodeDefinitions = ProcessNodeDefinitions(React);
let index = 0;

class ArticleDetailPage extends PureComponent {
  componentDidMount() {
    this.highlightCallBack();
  }
  componentDidUpdate() {
    this.highlightCallBack();
  }
  highlightCallBack = () => {
    document.querySelectorAll('pre code').forEach(block => {
      try {
        hljs.highlightBlock(block);
      } catch (e) {
        console.log(e);
      }
    });
  };
  processingInstructions = [
    {
      replaceChildren: false,
      shouldProcessNode: function(node: object) {
        return node.name && node.name === 'img' && node.attribs['src'];
      },
      processNode: function(node: object) {
        return <ImagePreview src={node.attribs['src']} />;
      },
    },
    {
      replaceChildren: false,
      shouldProcessNode: function(node: object) {
        return node.name && ['h1', 'h2', 'h3'].includes(node.name);
      },
      processNode: (node: object, children: string) => {
        return (
          <>
            <node.name id={`#Article${index}`}>{children}</node.name>
          </>
        );
      },
    },
    {
      shouldProcessNode: function(node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];
  render() {
    const { articleDetail, isMobile } = this.props;

    return (
      <Fragment>
        <Section className={styles.containner}>
          {!isMobile ? (
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
                    width={660}
                    height={393}
                    isOrigin={!articleDetail.type}
                    src={articleDetail.heroImage}
                    className={styles.heroImageSize}
                    sourceStyle={styles.sourceStyle}
                  />
                  {_.isEmpty(articleDetail) ? (
                    _.map(_.times(3, Number), () => <Skeleton active />)
                  ) : (
                    <div className={styles.artileContent}>
                      {HtmlToReactParser.parseWithInstructions(
                        articleDetail.content,
                        () => true,
                        this.processingInstructions,
                      )}
                    </div>
                  )}
                </div>
              </Col>
              <Col span={6}>
                {/* <ArticleDirectory anchorList={this.tempArr}/> */}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col className={styles.detailPage}>
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
                    width={document.documentElement.clientWidth - 40}
                    height={220}
                    isOrigin={!articleDetail.type}
                    src={articleDetail.heroImage}
                    className={styles.heroImageSize}
                    sourceStyle={styles.sourceStyle}
                    isMobile={isMobile}
                  />
                  {_.isEmpty(articleDetail) ? (
                    _.map(_.times(3, Number), () => <Skeleton active />)
                  ) : (
                    <div className={styles.artileContent}>
                      {HtmlToReactParser.parseWithInstructions(
                        articleDetail.content,
                        () => true,
                        this.processingInstructions,
                      )}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </Section>
        {!isMobile && <BackTop />}
      </Fragment>
    );
  }
}
export default ArticleDetailPage;
