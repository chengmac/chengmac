import { Effect, ImmerReducer, Subscription } from 'umi';
import Api from '@/services';
import { matchPathRegexp } from '@/utils';

const { getAllArticle } = Api;

export interface AppModelState {
  isMobile: boolean;
  minHeight: number;
  articleList: [];
}
export interface AppModelType {
  namespace: 'app';
  state: AppModelState;
  effects: {
    updateState: Effect;
    getAllArticle: Effect;
  };
  reducers: {
    updateStateSuccess: ImmerReducer<AppModelState>;
    getAllArticleSuccess: ImmerReducer<AppModelState>;
  };
  subscriptions: { setup: Subscription };
}

const AppModel: AppModelType = {
  namespace: 'app',
  state: {
    isMobile: false,
    minHeight: 0,
    articleList: [{}, {}, {}],
  },
  effects: {
    *updateState({ payload }, { call, put }) {
      console.log(payload);
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
        }
      });
    },
  },
};
export default AppModel;
