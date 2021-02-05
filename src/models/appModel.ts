import { Effect, ImmerReducer, Subscription } from 'umi';
import Api from '@/services';
import { matchPathRegexp } from '@/utils';
import Cookies from 'js-cookie';

const {
  getAllArticle,
  labelList,
  login,
  getLikeMiuscList,
  getMiuscDetail,
} = Api;

export interface AppModelState {
  isMobile: boolean;
  minHeight: number;
  articleList: [];
  labelList: [];
  muiscIdList: [];
  currentMuisc: {};
}
export interface AppModelType {
  namespace: 'app';
  state: AppModelState;
  effects: {
    updateState: Effect;
    getAllArticle: Effect;
    getLabelList: Effect;
    getLikeMiuscList: Effect;
    getMiuscDetail: Effect;
  };
  reducers: {
    updateStateSuccess: ImmerReducer<AppModelState>;
    getAllArticleSuccess: ImmerReducer<AppModelState>;
    getLabelListSuccess: ImmerReducer<AppModelState>;
    getMiuscListSuccess: ImmerReducer<AppModelState>;
    miuscObjectSuccess: ImmerReducer<AppModelState>;
  };
  subscriptions: { setup: Subscription };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    isMobile: false,
    minHeight: 0,
    articleList: [],
    labelList: [],
    muiscIdList: [],
    currentMuisc: {},
  },
  effects: {
    *updateState({ payload }, { call, put }) {
      yield put({
        type: 'updateStateSuccess',
        payload: payload,
      });
    },
    *getAllArticle({ payload }, { call, put }) {
      const data = yield call(getAllArticle, payload);
      if (data && data.success) {
        let articleList = data?.result?.list;
        yield put({
          type: 'getAllArticleSuccess',
          payload: {
            articleList: articleList,
          },
        });
      }
    },
    *getLabelList({ payload }, { call, put }) {
      const data = yield call(labelList, payload);
      if (data && data.success) {
        yield put({
          type: 'getLabelListSuccess',
          payload: {
            labelList: data?.result,
          },
        });
      }
    },
    *getLikeMiuscList({ payload }, { call, put }) {
      console.log('payload', payload);
      if (Cookies.get('uid')) {
        payload.uid = Cookies.get('uid');
      }
      const data = yield call(getLikeMiuscList, payload);
      if (data && data.success) {
        if (data.result?.uid) {
          Cookies.set('uid', data.result?.uid);
        }
        yield put({
          type: 'getMiuscListSuccess',
          payload: {
            muiscIdList: data?.result.ids,
          },
        });
        return Promise.resolve(data.result);
      }
      return Promise.reject(data);
    },
    *getMiuscDetail({ payload }, { call, put }) {
      const data = yield call(getMiuscDetail, payload);
      if (data && data.success) {
        yield put({
          type: 'miuscObjectSuccess',
          payload: {
            currentMuisc: {
              id: data.result.body.id,
              coverImgUrl: data.result.body.coverImgUrl,
              resourceUrl: data.result.body.resourceUrl,
              name: data.result.body.name,
              author: data.result.body.author,
            },
          },
        });
      }
    },
  },
  reducers: {
    updateStateSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    getAllArticleSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    getLabelListSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    getMiuscListSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    miuscObjectSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        const isLandingPage = matchPathRegexp('/', pathname);
        if (isLandingPage) {
          dispatch({
            type: 'getAllArticle',
            payload: {
              status: 'PUB',
              page: 1,
              pageSize: 10,
            },
          });
          dispatch({
            type: 'getLabelList',
            payload: {},
          });
        }
      });
    },
  },
};
export default AppModel;
