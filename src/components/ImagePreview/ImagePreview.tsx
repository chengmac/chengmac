import React, { Fragment, PureComponent } from 'react';
import { Skeleton } from 'antd';
import styles from './ImagePreview.less';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ImagePreview extends PureComponent {
  state = {
    isPreview: false,
  };
  openPreview = () => {
    this.setState({ isPreview: true });
  };
  render() {
    const { src, className, ...resetProps } = this.props;

    return (
      <Fragment>
        <div>
          <img
            src={src}
            className={classnames(styles.image, className)}
            onClick={this.openPreview}
          />
          {this.state.isPreview && (
            <div
              className={styles.previewImage}
              onClick={() => this.setState({ isPreview: false })}
            >
              <img src={src} className={classnames(styles.image, className)} />
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default ImagePreview;
