import React from 'react';
import { useSession } from 'next-auth/client';
import _ from 'lodash';
import annotations from '../mock_data/annotations.json';
import ImagesGrid from './ImagesGrid';

const labelsSet = _.uniqWith(
  _.flatMap(annotations.data, (annotation) => annotation.labels),
  _.isEqual,
);

const labels = [...labelsSet];

const DashboardContainer = (props) => {
  const [session] = useSession();

  return (
    <div style={{ height: '100vh' }}>
      <ImagesGrid annotations={annotations.data} columns={3} labels={labels} />
    </div>
  );
};

export default DashboardContainer;
