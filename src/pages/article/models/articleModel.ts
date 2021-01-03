import { Effect, ImmerReducer, Subscription } from 'umi';
import Api from '@/services';
import _ from 'lodash';
import { matchPathRegexp } from '@/utils';

const { getArticleById } = Api;

export interface ArticleModelState {
  articleDetail: {};
}
interface ArticleModelType {
  namespace: 'article';
  state: ArticleModelState;
  effects: {
    getArticleById: Effect;
  };
  reducers: {
    getArticleByIdSuccess: ImmerReducer<ArticleModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',
  state: {
    articleDetail: {},
  },
  effects: {
    *getArticleById({ payload }, { call, put }) {
      const data = yield call(getArticleById, payload);
      if (data && data.success) {
        yield put({
          type: 'getArticleByIdSuccess',
          payload: {
            articleDetail: data.result,
          },
        });
      }
    },
  },
  reducers: {
    getArticleByIdSuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(location => {
        const articleDetailPage = matchPathRegexp(
          '/article/:id',
          location.pathname,
        );
        if (articleDetailPage) {
          dispatch({
            type: 'getArticleById',
            payload: { articleId: articleDetailPage[1] },
          });
        }
      });
    },
  },
};
export default ArticleModel;
