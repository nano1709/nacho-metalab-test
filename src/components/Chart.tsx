import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchCommitActivity } from '../services/github';
import { generateRandomStrokeColor } from '../utils/generateRandomStrokeColor';
import { transformDataForChart } from '../utils/transformDataForChart';

interface IChart {
  values?: any[];
}

const Chart = ({values}: IChart) => {
  const [commitData, setCommitData] = useState<any[]>([]);
  const fetchData = async (repository: any) => {
    try {
      const owner = repository.owner_login;
      const repoName = repository.name;
      
      const commitActivityData = await fetchCommitActivity(owner, repoName);
      const dataForChart = transformDataForChart(commitActivityData, repoName);
      setCommitData([...commitData, dataForChart]);
    } catch (error) {
      console.error('Error fetching commit activity:', error);
    }
  };

  useEffect(() => {
    values?.forEach(repo => {
      fetchData(repo);
    });
  }, [values]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={commitData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke={generateRandomStrokeColor()} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        {values?.map(x => {
          <Line type="monotone" dataKey={x.name} stroke={generateRandomStrokeColor()} />
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default Chart;