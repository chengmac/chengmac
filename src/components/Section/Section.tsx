import react, { Fragment, PureComponent } from 'react';
import styles from './Section.less';
import { Button } from 'antd';
import classnames from 'classnames';
import { SearchOutlined } from '@ant-design/icons';

class Section extends PureComponent {
  render() {
    const { className, children, ...resetProps } = this.props;

    return (
      <section
        className={classnames(styles.section, className)}
        {...resetProps}
      >
        <div>{children}</div>
      </section>
    );
  }
}

export default Section;
