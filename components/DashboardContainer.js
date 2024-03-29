import React from 'react';
import { view } from '@risingstack/react-easy-state';
import { useQuery } from 'react-query';
import ImagesGrid from './ImagesGrid';
import Store from '../utils/store';
import { fetchAnnotations } from '../utils/api';

const DashboardContainer = () => {
  const { data: annotations } = useQuery(
    ['annotations', Store.selectedProject],
    () => Store.selectedProject && fetchAnnotations(Store.selectedProject, [], 2, 50),
    { enabled: !!Store.labelColors },
  );

  return (
    <ImagesGrid annotations={annotations ? annotations.data : []} labels={Store.labels} />
  );
};

export default view(DashboardContainer);
