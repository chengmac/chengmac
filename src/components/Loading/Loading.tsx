import react, { PureComponent } from 'react';
import styles from './Loading.less';
import { Layout } from 'antd';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import classnames from 'classnames';

class Loading extends PureComponent {
  render() {
    const { isMobile, loading, full = false } = this.props;

    return (
      <>
        {loading && (
          <div
            className={classnames({
              [styles.fullWrap]: full,
              [styles.containerWrap]: !full,
            })}
          >
            <span className="">
              <Loading3QuartersOutlined className={styles.loadingIcon} />
            </span>
          </div>
        )}
      </>
    );
  }
}

export default Loading;
