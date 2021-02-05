import react, { PureComponent } from 'react';
import styles from './Footer.less';
import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class Footer extends PureComponent {
  render() {
    const { isMobile } = this.props;

    return (
      <Layout.Footer className={styles.footer}>
        <div className={styles.headerWrap}>麻衣逢雪暖，草履蹑云轻</div>
        <div className={styles.headerWrap}>
          <a href="https://beian.miit.gov.cn" target="_bank">
            陕ICP备18021642号-2
          </a>
        </div>
      </Layout.Footer>
    );
  }
}

export default Footer;
