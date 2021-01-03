import React, { Fragment, PureComponent } from 'react';
import styles from './LandingRightColumn.less';
import { Card } from 'antd';

class LandingRightColumn extends PureComponent {
  render() {
    const { isMobile } = this.props;
    return (
      <Fragment>
        <div className={styles.landingRightColumn}>
          <Card title="精选">{}</Card>
          <div className={styles.categoryWrap}>
            <Card title="Card title">sdfsdfds</Card>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LandingRightColumn;
