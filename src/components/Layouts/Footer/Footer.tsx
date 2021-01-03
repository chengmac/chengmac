import react, { PureComponent } from 'react';
import styles from './Footer.less';
import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class Footer extends PureComponent {
  render() {
    const { isMobile } = this.props;

    return (
      <Layout.Footer className={styles.footer}>
        <div className={styles.headerWrap}>
          系统由 React+Node+Ant Desgin驱动
        </div>
        <div className={styles.headerWrap}>chengmac.cn</div>
      </Layout.Footer>
    );
  }
}

export default Footer;
