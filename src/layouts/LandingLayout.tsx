import React, { Fragment, PureComponent } from 'react';
import styles from './LandingLayout.less';
import Header from '@/components/Layouts/Header/Header';
import Footer from '@/components/Layouts/Footer/Footer';
import HeaderSearch from '@/components/Layouts/Header/HeaderSearch';
import Section from '@/components/Section/Section';
import { Layout, Drawer, Menu } from 'antd';
import { AppModelState, connect } from 'umi';
import Button from '@/components/Button/Button';
import { SearchOutlined } from '@ant-design/icons';

class LandingLayout extends PureComponent {
  state = {
    searchVisible: false,
    siderVisible: false,
  };
  openSearch() {
    this.setState({
      searchVisible: true,
    });
  }
  closeSearch() {
    this.setState({
      searchVisible: false,
    });
  }
  openSiderMenu() {
    if (this.state.siderVisible) {
      this.setState({
        siderVisible: false,
      });
    } else {
      this.setState({
        siderVisible: true,
      });
    }
  }
  onClose() {
    this.setState({
      siderVisible: false,
    });
  }

  handleMobileMenu(key: string) {
    switch (key) {
      case 'search':
        this.onClose();
        return this.openSearch();
    }
  }
  render() {
    const { children, app } = this.props;
    const { isMobile, minHeight } = app;
    const headerProps = {
      isMobile: isMobile,
      openSearch: this.openSearch.bind(this),
      openSiderMenu: this.openSiderMenu.bind(this),
      siderVisible: this.state.siderVisible,
    };
    return (
      <Fragment>
        <Section id={'LandingLayout'}>
          <Header {...headerProps} />
          <HeaderSearch
            isMobile={isMobile}
            visible={this.state.searchVisible}
            closeSearch={this.closeSearch.bind(this)}
          />
          {isMobile && (
            <Drawer
              closable={false}
              mask={false}
              closable={false}
              onClose={() => this.onClose()}
              visible={this.state.siderVisible}
              bodyStyle={{ marginTop: 50, padding: 0 }}
              className={styles.drawer}
              width={'100%'}
            >
              <Menu
                className={styles.search}
                onClick={({ item, key }) => this.handleMobileMenu(key)}
              >
                <Menu.Item icon={<SearchOutlined />} key={'search'}>
                  搜索
                </Menu.Item>
              </Menu>
            </Drawer>
          )}
          <Layout.Content
            className={styles.content}
            style={{ minHeight: minHeight, paddingTop: isMobile ? 50 : 60 }}
          >
            {children}
          </Layout.Content>
          <Footer />
        </Section>
      </Fragment>
    );
  }
}
export default connect(({ app }: { app: AppModelState }) => ({
  app,
}))(LandingLayout);
