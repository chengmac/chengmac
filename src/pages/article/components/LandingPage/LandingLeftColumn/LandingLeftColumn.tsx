import React, { Fragment, PureComponent } from 'react';
import styles from './LandingLeftColumn.less';
import { Divider, Typography } from 'antd';
import ArticleListCard from '../ArticleListCard/ArticleListCard';
import _ from 'lodash';

const { Title } = Typography;
class LandingLeftColumn extends PureComponent {
  render() {
    const { isMobile, articleList } = this.props;
    let articleListData = [];
    if (articleList.length !== 0) {
      articleListData = articleList;
    } else {
      articleListData = _.times(6, {});
    }
    return (
      <Fragment>
        <div className={styles.landingLeftColumnList}>
          {articleListData.map(item => (
            <ArticleListCard article={item} isMobile={isMobile} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default LandingLeftColumn;
