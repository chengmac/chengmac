import React, { Fragment, PureComponent } from 'react';
import styles from './LandingLeftColumn.less';
import { Divider, Typography } from 'antd';
import ArticleListCard from '../../ArticleListCard/ArticleListCard';

const { Title } = Typography;
class LandingLeftColumn extends PureComponent {
  render() {
    const { isMobile, articleList } = this.props;
    console.log(articleList);
    return (
      <Fragment>
        <div className={styles.landingLeftColumnList}>
          {articleList.map(item => (
            <ArticleListCard article={item} isMobile={isMobile} />
          ))}
        </div>
      </Fragment>
    );
  }
}

export default LandingLeftColumn;
