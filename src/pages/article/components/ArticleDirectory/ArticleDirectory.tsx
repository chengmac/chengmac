import React, { Fragment, PureComponent } from 'react';
import styles from './ArticleDirectory.less';
import { CalendarOutlined, FolderOutlined } from '@ant-design/icons';
import moment from 'moment';
import classnames from 'classnames';
import { Card, Anchor } from 'antd';
const { Link } = Anchor;

class ArticleDirectory extends PureComponent {
  render() {
    const { anchorList } = this.props;
    return (
      <Fragment>
        <Card>
          <Anchor showInkInFixed offsetTop={80}>
            {anchorList.map((item: any) => (
              <Link href={`#${item.url}`} title={item.title} />
            ))}
          </Anchor>
        </Card>
      </Fragment>
    );
  }
}
export default ArticleDirectory;
