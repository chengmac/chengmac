import React, { Fragment, PureComponent } from 'react';
import { Skeleton } from 'antd';
import styles from './HeroImage.less';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class HeroImage extends PureComponent {
  render() {
    const {
      src,
      className,
      sourceStyle,
      source,
      isOrigin,
      sm,
      md,
      lg,
      width,
      height,
      isMobile,
      ...resetProps
    } = this.props;

    return (
      <Fragment>
        {!src ? (
          <Skeleton.Input
            active={true}
            style={{ width: width || 80, height: height || 50 }}
            loading={!src}
          />
        ) : (
          <figure
            className={classnames(styles.heroImage, className, {
              [styles.sm]: !!sm,
              [styles.md]: !!md,
              [styles.lg]: !!lg,
              [styles.mobile]: isMobile,
            })}
            {...resetProps}
          >
            {source && (
              <span
                className={classnames(styles.type, sourceStyle, {
                  [styles.original]: isOrigin,
                  [styles.reprint]: !isOrigin,
                })}
              >
                {source ? '原创' : '转载'}
              </span>
            )}
            <img
              src={src}
              className={classnames(styles.image, className, {
                [styles.sm]: !!sm,
                [styles.md]: !!md,
                [styles.lg]: !!lg,
                [styles.mobile]: isMobile,
              })}
            />
          </figure>
        )}
      </Fragment>
    );
  }
}

export default HeroImage;
