import { CommitActivity } from "../services/github";

interface TransformedChartData {
  week: string; // Assuming it's a date string
  total: number;
  repoName: string;
}
export const transformDataForChart = (inputData: CommitActivity[], repoName: string): TransformedChartData[] => {
  return inputData?.map((x: CommitActivity) => ({
    week: new Date(x.week * 1000).toLocaleDateString(), // Convert timestamp to date string
    total: x.total,
    repoName: repoName
  }));
};