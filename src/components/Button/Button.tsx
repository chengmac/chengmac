import react, { PureComponent } from 'react';
import styles from './Button.less';
import { Button } from 'antd';
import classnames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';

class AntdButton extends PureComponent {
  render() {
    const {
      isMobile,
      noBorder,
      className,
      children,
      ...resetProps
    } = this.props;

    return (
      <Button
        className={classnames(styles.button, className, {
          [styles.noBorder]: noBorder,
        })}
        // onClick={() => this.props.onClickHandle()}
        {...resetProps}
      >
        {children}
      </Button>
    );
  }
}

export default AntdButton;
