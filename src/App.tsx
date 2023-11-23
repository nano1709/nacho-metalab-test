import { useEffect, useState } from 'react';
import Chart from './components/Chart';
import Column from './components/Column';
import Layout from './components/Layout';
import SearchBar from './components/SearchBar';

function App() {
  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  const handleSelectedValuesChange = (values: any[]) => {
    setSelectedValues(values);
  };

  return (
    <Layout>
      <Column>
        <Chart values={selectedValues}></Chart>
      </Column>
      <Column className="bg-[#37374A]">
        <SearchBar placeHolder='Search a GitHub Repository...' onSelectedValuesChange={handleSelectedValuesChange}/>
      </Column>
    </Layout>
  );
}

export default App;
