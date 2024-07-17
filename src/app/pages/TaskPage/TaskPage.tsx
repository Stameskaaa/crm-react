import { useEffect, useState, ChangeEvent } from 'react';
import { getIssue } from '../../../services/api';
import { Issue } from '../../../types/types';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Container } from '../../components/container/Container';
import styles from './taskpage.module.scss';
import { Finances, Ratio } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setCalculatedFinances, setCalculatedRatio } from '../../../features/slice/taskSlice';
import Loader from '../../components/loader/Loader';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

type IssueStatus = 'Done' | 'In Progress' | 'New';

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const TaskPage: React.FC = () => {
  const [weekCount, setWeekCount] = useState(8);

  const { calculatedFinances, calculatedRatio } = useAppSelector((state) => state.task);
  const { currentLanguageObject } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const getIssueRequest = async () => {
    try {
      setLoading(true);
      const data = await getIssue();

      if (data) {
        const finances = calculateFinances(data?.data, weekCount);

        dispatch(setCalculatedFinances(finances));
        const ration = calculateRatio(data?.data);
        dispatch(setCalculatedRatio(ration));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFinances = (issues: Issue[], weekCount: number = 8): Finances[] => {
    const results: Finances[] = [];
    const now = new Date();
    const result: Finances = { revenue: 0, costs: 0, profit: 0 };

    for (let i = 0; i < weekCount; i++) {
      const startDate = new Date(now);
      startDate.setDate(now.getDate() - 7 * (i + 1));
      const endDate = new Date(now);
      endDate.setDate(now.getDate() - 7 * i);

      const weeklyIssues = issues.filter((issue) => {
        if (issue.status === 'Done' && issue.date_finished) {
          const dateFinished = new Date(issue.date_finished);
          return dateFinished >= startDate && dateFinished < endDate;
        }
        return false;
      });

      weeklyIssues.forEach((issue) => {
        result.revenue += issue.received_from_client;
        result.costs +=
          issue.send_to_account_manager + issue.send_to_designer + issue.send_to_project_manager;
      });

      result.profit = result.revenue - result.costs;
      results.push(result);
    }

    return results;
  };

  const calculateRatio = (issues: Issue[]): Ratio => {
    const resultRatio: Ratio = {
      Done: 0,
      'In Progress': 0,
      New: 0,
    };

    issues.map((issue) => {
      resultRatio[issue.status as IssueStatus]++;
    });

    return resultRatio;
  };

  const dataBar = {
    labels: Array.from({ length: weekCount }, (_, index) => `Week ${index + 1}`),
    datasets: [
      {
        label: 'Profit',
        data: calculatedFinances.map((objectData) => objectData.profit),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Costs',
        data: calculatedFinances.map((objectData) => objectData.costs),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Revenue',
        data: calculatedFinances.map((objectData) => objectData.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const dataPie = {
    labels: ['Done', 'In Progress', 'New'],
    datasets: [
      {
        data: [calculatedRatio?.Done, calculatedRatio?.['In Progress'], calculatedRatio?.New],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (calculatedFinances.length === 0 && !calculatedRatio) {
      getIssueRequest();
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.graph_container}>
      <Container>
        <div>
          <label className={styles.label}>{currentLanguageObject.weekCount}: </label>
          <select
            value={weekCount}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setWeekCount(Number(e.target.value))}>
            {Array.from({ length: 8 }, (_, i) => i + 1).map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        {calculatedFinances.length > 0 ? (
          <Bar data={dataBar} options={options} />
        ) : (
          <div>{currentLanguageObject.noData}</div>
        )}
      </Container>

      <Container className={styles.container_pie}>
        <Pie data={dataPie} />
      </Container>
    </div>
  );
};
