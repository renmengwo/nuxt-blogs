import { fetch } from './request';
export const getArticleList = (params) => fetch('article/getArticleList', params);
