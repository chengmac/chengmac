import React, { Fragment, PureComponent } from 'react';
import styles from './ArticleMetaInfo.less';
import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import moment from 'moment';
import classnames from 'classnames';
import _ from 'lodash';

class ArticleMetaInfo extends PureComponent {
  render() {
    const { article, className, isMobile, dateFormat } = this.props;
    return (
      <Fragment>
        {!_.isEmpty(article) && (
          <div className={classnames(styles.articleInfo, className)}>
            <div>
              <CalendarOutlined style={{ paddingRight: 5 }} />
              <span>{moment(article.createTime).format(dateFormat)}</span>
            </div>
            <div className={styles.articleCategory}>
              <FolderOutlined style={{ paddingRight: 5 }} />
              <span>{article.category}</span>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
export default ArticleMetaInfo;
