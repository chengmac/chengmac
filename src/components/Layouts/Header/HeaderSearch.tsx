import react, { PureComponent } from 'react';
import styles from './HeaderSearch.less';
import { Input } from 'antd';
import classnames from 'classnames';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';

class HeaderSearch extends PureComponent {
  render() {
    const { isMobile, visible } = this.props;

    return (
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
                placeholder={'搜索...'}
                style={{ opacity: visible ? 1 : 0, height: isMobile ? 50 : 60 }}
                // onSearch={}
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
        ></div>
      </div>
    );
  }
}

export default HeaderSearch;
