import React, { Fragment, PureComponent } from 'react';
import styles from './LandingRightColumn.less';
import { Card, Tag, Skeleton } from 'antd';
import MuiscPlayer from '@/components/MuiscPlayer/MuiscPlayer';
import _ from 'lodash';

class LandingRightColumn extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/getLikeMiuscList',
      payload: {},
    }).then((resp: object) => {
      dispatch({
        type: 'app/getMiuscDetail',
        payload: {
          id: resp?.ids[0],
        },
      });
    });
  }

  nextSong = (id: number) => {
    let muiscId = this.findMuiscId(id, true);
    this.props.dispatch({
      type: 'app/getMiuscDetail',
      payload: {
        id: muiscId,
      },
    });
  };

  prevousSong = (id: number) => {
    let muiscId = this.findMuiscId(id, false);
    this.props.dispatch({
      type: 'app/getMiuscDetail',
      payload: {
        id: muiscId,
      },
    });
  };

  findMuiscId(id: number, isNext: boolean) {
    if (typeof id !== 'number') {
      return;
    }
    let index = _.indexOf(this.props.muiscIdList, id);
    let muiscId = null,
      maxIndex = this.props.muiscIdList.length - 1;
    if (index === 0) {
      muiscId = this.props.muiscIdList[isNext ? index + 1 : maxIndex];
    }
    if (index === maxIndex) {
      muiscId = this.props.muiscIdList[isNext ? 0 : maxIndex - 1];
    }
    if (index > 0 && index < maxIndex) {
      muiscId = this.props.muiscIdList[isNext ? index + 1 : index - 1];
    }
    return muiscId;
  }
  render() {
    const { currentMuisc, loading } = this.props;
    return (
      <Fragment>
        <div className={styles.landingRightColumn}>
          <Card title={'音乐休憩区'}>
            {!_.isEmpty(currentMuisc) ? (
              <MuiscPlayer
                muiscId={currentMuisc.id}
                muiscName={currentMuisc.name}
                resource={currentMuisc.resourceUrl}
                coverImgUrl={currentMuisc.coverImgUrl}
                nextSong={this.nextSong}
                prevousSong={this.prevousSong}
              />
            ) : (
              <Skeleton.Input
                style={{ width: 200, height: 230 }}
                loading={!loading.effects['app/getMiuscDetail']}
                active
              />
            )}
          </Card>
        </div>
      </Fragment>
    );
  }
}

export default LandingRightColumn;
