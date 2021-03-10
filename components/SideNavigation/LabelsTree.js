/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { FaSquare } from 'react-icons/fa';
import { view, store, batch } from '@risingstack/react-easy-state';
import styles from './LabelsTreeStyle.module.css';
import HierarchyTree from '../HierarchyTree';
import Store from '../../utils/store';

const LabelsTree = ({ labels }) => {
  const hiddenShapes = store({ });
  const groupedLabels = useMemo(() => _.groupBy(labels, 'shape'), [labels]);

  const handleOnLabelVisibilityChange = (name, shape, value) => {
    Store.hiddenLabels[`${name}-${shape}`] = !value;
  };

  const handleOnShapeVisibilityChange = (shape, labelGroup, value) => {
    batch(() => {
      hiddenShapes[shape] = !value;
      _.forEach(labelGroup, (label) => {
        Store.hiddenLabels[`${label.name}-${shape}`] = !value;
      });
    });
  };

  return (
    <Box
      width="100%"
      color="white"
      fill="white"
      className={styles.labelsTree}
      fontSize={13}
      overflowY="auto"
      overflowX="hidden"
      marginBottom="30px"
    >
      <HierarchyTree content="Ground truth" canHide>
        {_.map(groupedLabels, (labelGroup, shape) => (
          <HierarchyTree
            key={shape}
            content={shape}
            visible={!hiddenShapes[shape]}
            canHide
            onVisibilityChanged={(value) => handleOnShapeVisibilityChange(shape, labelGroup, value)}
          >
            {_.sortBy(labelGroup, 'name').map(({ name, attributes }) => (
              <HierarchyTree
                key={`${name}-${shape}`}
                content={name}
                canHide
                visible={!Store.hiddenLabels[`${name}-${shape}`]}
                onVisibilityChanged={(value) => handleOnLabelVisibilityChange(name, shape, value)}
                leftIcon={<FaSquare color={Store.labelColors[`${name}-${shape}`]} style={{ display: 'inline' }} />}
              >
                {attributes.map((attribute) => <HierarchyTree content={attribute} />)}
              </HierarchyTree>
            ))}
          </HierarchyTree>
        ))}
      </HierarchyTree>
    </Box>
  );
};

export default view(LabelsTree);
