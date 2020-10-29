import React from 'react';
import Head from '../Helpers/Head';
import useFetch from '../../Hooks/useFetch';
import { STATS_GET } from '../../api';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Error';
import UserStatsGraphs from './UserStatsGraphs';

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');

    const getData = async () => {
      const { url, options } = STATS_GET(token);

      await request(url, options);
    };

    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <div>
        <Head title="Stats" />

        <UserStatsGraphs data={data} />
      </div>
    );
  else return null;
};

export default UserStats;
