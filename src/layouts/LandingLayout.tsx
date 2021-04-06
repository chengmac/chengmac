import React, { Fragment, PureComponent } from 'react';
import styles from './LandingLayout.less';
import Header from '@/components/Layouts/Header/Header';
import Footer from '@/components/Layouts/Footer/Footer';
import SideTools from '@/components/Layouts/SideTools/SideTools';
import Fireworks from '@/components/Fireworks/Fireworks';
import HeaderSearch from '@/components/Layouts/Header/HeaderSearch';
import Section from '@/components/Section/Section';
import { Layout, Drawer, Menu, Row, Col } from 'antd';
import { AppModelState, connect } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import LandingRightColumn from '@/pages/article/components/LandingPage/LandingRightColumn/LandingRightColumn';

class LandingLayout extends PureComponent {
  state = {
    searchVisible: false,
    siderVisible: false,
    startPlayFireworks: false,
  };
  openSearch() {
    this.setState({
      searchVisible: true,
    });
    this.props.dispatch({
      type: 'app/updateSearchContent',
      payload: {
        searchList: [],
        searchContent: '',
      },
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

  startPlay = () => {
    this.setState({
      startPlayFireworks: !this.state.startPlayFireworks,
    });
  };
  render() {
    const { children, app, dispatch, loading } = this.props;
    const {
      isMobile,
      minHeight,
      searchList,
      searchContent,
      labelList,
      currentMuisc,
      muiscIdList,
    } = app;
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
            dispatch={dispatch}
            loading={loading}
            searchList={searchList}
            searchContent={searchContent}
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
            <Section
              className={styles.containner}
              style={{ minHeight: '100%', paddingTop: isMobile ? 10 : 20 }}
            >
              {!isMobile ? (
                <Row>
                  <Col span={18} className={styles.landingLeftColumn}>
                    {children}
                  </Col>
                  <Col span={6}>
                    <LandingRightColumn
                      labelList={labelList}
                      dispatch={dispatch}
                      currentMuisc={currentMuisc}
                      muiscIdList={muiscIdList}
                      loading={loading}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>{children}</Row>
              )}
            </Section>
          </Layout.Content>
          <Footer />
          <SideTools startPlay={this.startPlay} />
          {this.state.startPlayFireworks && (
            <Fireworks stopPlay={this.startPlay} />
          )}
        </Section>
      </Fragment>
    );
  }
}
export default connect(
  ({ app, loading }: { app: AppModelState; loading: any }) => ({
    app,
    loading,
  }),
)(LandingLayout);
