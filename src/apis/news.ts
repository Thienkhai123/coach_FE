import { api } from '@/configs/app.config';
import {
  ILatestNewParams,
  IListNewParams,
  INewDetailParams,
} from '@/interfaces/httpRequest/INews';
import axios from 'axios';

export const fetchHostNews = async () => {
  try {
    const response = await axios.get(api.NEWS.GET_BLOG_HOST);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchNewList = async (params: IListNewParams) => {
  try {
    const response = await axios.get(
      `${api.NEWS.GET_BLOG_LIST}?page=${params.page}`,
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchNewDetail = async (params: INewDetailParams) => {
  try {
    const { id, url } = params;
    if (url !== undefined) {
      const response = await axios.get(
        `${api.NEWS.GET_BLOG_DETAIL_URL}/${url}`,
      );
      return response.data;
    } else {
      const response = await axios.get(`${api.NEWS.GET_BLOG_DETAIL_ID}/${id}`);
      return response.data;
    }
  } catch (err) {
    return err;
  }
};

export const fetchLatestNews = async (params: ILatestNewParams) => {
  try {
    const response = await axios.get(`${api.NEWS.GET_BLOG_NEWS}/${params.id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
