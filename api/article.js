import { fetch, post } from './request';
export const getArticleList = (params) => fetch('article/getArticleList', params);
export const getUseArticleList = (params) => fetch('article/queryUserArticle', params);
export const queryArticleDetails = (id) => fetch(`article/queryArticleDetails?id=${id}`);
export const addArticle = (params) => post('article/addArticle', params);
export const updateArticle = (params) => post('article/updateArticle', params);
export const setDisabledArticle = (params) => post('article/setDisabledArticle', params);
