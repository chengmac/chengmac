import React, { Fragment, PureComponent } from 'react';
import styles from './MuiscPlayer.less';
import Button from '@/components/Button/Button';
import {
  StepBackwardOutlined,
  PauseOutlined,
  CaretRightOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import classnames from 'classnames';

class MuiscPlayer extends PureComponent {
  constructor(props: object) {
    super(props);
  }
  state = {
    isPaused: false,
  };
  componentDidMount() {
    this.refs.audio.addEventListener('ended', this.audioPlayEnd, false);
    document.body.addEventListener('mousedown', this.startPlay, false);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.muiscId != this.props.muiscId) {
      this.startPlay();
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.startPlay, false);
  }

  audioPlayEnd = () => {
    this.props.nextSong(this.props.muiscId);
  };
  startPlay = () => {
    this.refs.audio.play();
    this.setState({ isPaused: true });
  };
  endPlay = () => {
    this.refs.audio.pause();
    this.setState({ isPaused: false });
  };
  nextSong = (id: number) => {
    this.refs.audio.pause();
    this.setState({ isPaused: false });
    this.props.nextSong(id);
  };
  prevousSong = (id: number) => {
    this.refs.audio.pause();
    this.setState({ isPaused: false });
    this.props.prevousSong(id);
  };
  render() {
    return (
      <Fragment>
        <div className={styles.muiscPlayer}>
          <div className={styles.muiscName}>
            <span className={styles.muiscNameText}>{this.props.muiscName}</span>
          </div>
          <div className={styles.muiscImageWrap}>
            <div className={styles.muiscImage}>
              <span
                className={classnames(styles.muisc, {
                  [styles.running]: this.state.isPaused,
                  [styles.paused]: !this.state.isPaused,
                })}
                style={{ backgroundImage: `url(${this.props.coverImgUrl})` }}
              ></span>
            </div>
          </div>
          <audio src={this.props.resource} ref={'audio'}></audio>
          <div className={styles.controllers}>
            <Button
              noBorder
              icon={<StepBackwardOutlined />}
              onClick={() => this.prevousSong(this.props.muiscId)}
            />
            {this.state.isPaused ? (
              <Button
                noBorder
                icon={<PauseOutlined />}
                onClick={this.endPlay}
              />
            ) : (
              <Button
                noBorder
                icon={<CaretRightOutlined />}
                onClick={this.startPlay}
              />
            )}
            <Button
              noBorder
              icon={<StepForwardOutlined />}
              onClick={() => this.nextSong(this.props.muiscId)}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default MuiscPlayer;
