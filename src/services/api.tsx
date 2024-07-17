import axios, { AxiosResponse } from 'axios';
import {
  CommentRespone,
  DesignerResponse,
  QueryParams,
  Issue,
  Designer,
  ResultsDesignerResponse,
} from '../types/types';

async function getComment() {
  try {
    const response: AxiosResponse<CommentRespone[]> = await axios.get(
      'https://sandbox.creos.me/api/v1/comment/',
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}
async function getDesigner(params?: QueryParams) {
  try {
    const response: AxiosResponse<DesignerResponse> = await axios.get(
      'https://sandbox.creos.me/api/v1/designer/',
      { params },
    );
    return response;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
async function getIssue(params?: QueryParams) {
  try {
    const response: AxiosResponse<Issue[]> = await axios.get(
      'https://sandbox.creos.me/api/v1/issue/',
      { params },
    );

    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getSortedDesigners(params?: QueryParams, count: number = 10) {
  try {
    const response: AxiosResponse<Issue[]> = await axios.get(
      'https://sandbox.creos.me/api/v1/issue/',
      { params },
    );

    interface DesignerStats {
      [key: string]: [number, number];
    }

    const resultObject: DesignerStats = {};

    const result = response.data;
    for (let i = 0; i < result.length; i++) {
      const dateStarted = result[i].date_started_by_designer;
      const dateFinished = result[i].date_finished_by_designer;

      const startDate = new Date(dateStarted);
      const endDate = new Date(dateFinished);

      const resultData = endDate.getTime() - startDate.getTime();

      if (resultObject[result[i].designer]) {
        resultObject[result[i].designer][0] += resultData;
        resultObject[result[i].designer][1] += 1;
      } else {
        resultObject[result[i].designer] = [resultData, 1];
      }
    }

    const sortedEntries = Object.entries(resultObject).sort((a, b) => {
      const productA = a[1][0] * a[1][1];
      const productB = b[1][0] * b[1][1];

      return productB - productA;
    });

    const sortedIssue = sortedEntries.slice(0, count);

    let resultDesignerArray: [ResultsDesignerResponse, string][] = [];
    let page = 1;

    if (sortedIssue) {
      while (resultDesignerArray.length < 10 && page < 3) {
        const designerList = await getDesigner({ limit: 128, page });
        page++;
        sortedIssue.forEach((value) => {
          const findedUserData = designerList.data.results.find(
            (designer: Designer) => designer.username === value[0],
          );
          if (findedUserData) {
            const date = new Date(value[1][0]);
            resultDesignerArray.push([findedUserData, date.getHours().toString()]);
          }
        });
      }
    }

    //мда как я должен делать сортировку по этому)
    return resultDesignerArray;
  } catch (error) {
    console.log(error);
  }
}

async function getProject() {
  try {
    const response = await axios.get('https://sandbox.creos.me/api/v1/project/');
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { getComment, getDesigner, getIssue, getProject, getSortedDesigners };
