import react, { PureComponent } from 'react';
import styles from './Header.less';
import { Layout, Input } from 'antd';
import { Link } from 'umi';
import Button from '@/components/Button/Button';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';

class Header extends PureComponent {
  render() {
    const { isMobile, siderVisible } = this.props;
    let headerLeft = [],
      headerRight = [];
    const logo = (
      <Link
        to={'/'}
        className={styles.logo}
        style={{ lineHeight: isMobile ? '50px' : '60px' }}
      >
        chengmac
      </Link>
    );
    headerLeft.unshift(logo);
    const search = (
      <Button
        icon={<SearchOutlined />}
        className={styles.search}
        noBorder
        onClick={() => this.props.openSearch()}
      ></Button>
    );
    if (!isMobile) {
      headerRight.unshift(search);
    } else {
      const mobileMenu = (
        <Button
          className={styles.openMenuBtn}
          noBorder
          onClick={() => this.props.openSiderMenu()}
        >
          <div className={siderVisible ? styles.closeMenu : styles.openMenu}>
            <span />
            <span />
            <span />
          </div>
        </Button>
      );
      headerRight.unshift(mobileMenu);
    }
    return (
      <Layout.Header className={styles.header}>
        <div className={classnames(styles.headerWrap, {})}>
          <div className={styles.headerLeft}>
            {headerLeft.map(component => component)}
          </div>
          <div className={styles.headerRight}>
            {headerRight.map(component => component)}
          </div>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;
