import { localData } from '../IAM/localData';
import { useContext, useEffect } from 'react';
import { hookSearchTag } from './searchTag.hook';
import { SearchTagContext } from '../context/searchTag.context';

const useDailyTask = () => {
  const {searchTagRes, setSearchTagRes} = useContext(SearchTagContext)
  useEffect(() => {
    const runDailyTask = async () => {
      try {
        await hookSearchTag('GET', null, setSearchTagRes);
      } catch (err) {
        console.error('Daily task error:', err);
      }
    };

    runDailyTask();
  }, []);
};

export default useDailyTask;
