import react, { PureComponent } from 'react';
import styles from './SideTools.less';
import Button from '@/components/Button/Button';

class SideTools extends PureComponent {
  render() {
    const { isMobile } = this.props;

    return (
      <div className={styles.sider}>
        <Button noBorder onClick={() => this.props.startPlay()}>
          烟火人间
        </Button>
      </div>
    );
  }
}

export default SideTools;
