import react, { PureComponent } from 'react';
import styles from './HeaderSearch.less';
import { Input, Typography } from 'antd';
import classnames from 'classnames';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import Loading from '@/components/Loading/Loading';
import HeroImage from '@/components/HeroImage/HeroImage';
import { NavLink, history } from 'umi';
import _ from 'lodash';

const { Paragraph } = Typography;
let searchTimer = null;
class HeaderSearch extends PureComponent {
  componentWillUnmount() {
    clearTimeout(searchTimer);
  }

  onSearch = () => {
    this.props.dispatch({
      type: 'app/headerSearch',
      payload: {
        keywords: this.props.searchContent,
      },
    });
  };
  onChange = e => {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'app/updateSearchContent',
      payload: {
        searchContent: e.target.value,
      },
    });
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      dispatch({
        type: 'app/headerSearch',
        payload: {
          keywords: this.props.searchContent,
        },
      });
    }, 500);
  };

  render() {
    const {
      isMobile,
      visible,
      searchList,
      searchContent,
      loading,
    } = this.props;
    return (
      <>
        <div
          className={classnames({
            [styles.hidden]: !visible,
            [styles.visibility]: visible,
          })}
        >
          <div className={styles.headerDiv}>
            <div
              className={classnames(styles.searchWrap, {
                [styles.mobileSearchWrap]: isMobile,
              })}
            >
              <div
                className={styles.inlineBlock}
                style={{ width: visible ? '100%' : 0 }}
              >
                <SearchOutlined
                  className={styles.icon}
                  style={{ opacity: visible ? 1 : 0 }}
                />
                <Input
                  className={styles.input}
                  value={this.props.searchContent}
                  placeholder={'搜索...'}
                  style={{
                    opacity: visible ? 1 : 0,
                    height: isMobile ? 50 : 60,
                  }}
                  onPressEnter={this.onSearch}
                  onChange={this.onChange}
                />
                <CloseOutlined
                  className={styles.closeSearch}
                  onClick={() => this.props.closeSearch()}
                  style={{ opacity: visible ? 1 : 0 }}
                />
              </div>
            </div>
          </div>
          <div
            className={styles.searchBackground}
            style={{ top: isMobile ? 50 : 60 }}
          >
            <div className={styles.loadingSearch}>
              {!_.isEmpty(this.props.searchContent) && (
                <div
                  className={styles.searchContentWrap}
                  style={{ width: isMobile ? '100%' : 620 }}
                >
                  {loading.effects['app/headerSearch'] ? (
                    <Loading loading={loading.effects['app/headerSearch']} />
                  ) : !_.isEmpty(searchList) ? (
                    searchList.map(item => {
                      return (
                        <div className={styles.searvhResult}>
                          <HeroImage
                            isOrigin={!item.type}
                            src={item.heroImage}
                            className={styles.heroImageSize}
                          />
                          <div className={styles.contentWrap}>
                            <NavLink
                              to={`/article/${item.articleId}`}
                              onClick={() => {
                                this.props.closeSearch();
                              }}
                            >
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                className={styles.title}
                              >
                                {item.title}
                              </Paragraph>
                            </NavLink>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className={styles.notFound}>没有搜索到结果</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HeaderSearch;
