import { fetch } from './request';
export const getArticleList = (params) => fetch('article/getArticleList', params);
export const getUseArticleList = (params) => fetch('article/queryUserArticle', params);
export const queryArticleDetails = (id) => fetch(`article/queryArticleDetails?id=${id}`);
