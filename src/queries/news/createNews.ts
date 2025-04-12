import axios from 'axios';
import * as yup from 'yup';

export interface ICreateNewsData {
  title: string;
  content: string;
  shelterID: string;
}

export const createNewsSchema = yup
  .object({
    title: yup.string().trim().required('Вкажіть назву'),
    content: yup
      .string()
      .trim()
      .required('Новина повинна містити зміст')
      .min(30, 'Зміст новини має складати хоча б 30 символів'),
    shelterID: yup.string().required('Вкажіть притулок')
  })
  .required();

export const createNewsMutation = (data: ICreateNewsData) => {
  console.log(data);

  const fd = new FormData();
  fd.append('title', data.title);
  fd.append('content', data.content);
  fd.append('shelterId', data.shelterID);

  return axios.post('http://localhost:8080/api/newsItems', fd);
};
