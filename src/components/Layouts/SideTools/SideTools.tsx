import react, { PureComponent } from 'react';
import styles from './SideTools.less';
import Button from '@/components/Button/Button';
import { FireOutlined } from '@ant-design/icons';

class SideTools extends PureComponent {
  render() {
    const { isMobile } = this.props;

    return (
      <div className={styles.sider}>
        <Button
          noBorder
          onClick={() => this.props.startPlay()}
          style={{ padding: '0px 10px' }}
          icon={<FireOutlined style={{ fontSize: 20 }} />}
        ></Button>
      </div>
    );
  }
}

export default SideTools;
