import React from 'react';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { FaSquare } from 'react-icons/fa';
import { view } from '@risingstack/react-easy-state';
import styles from './LabelsTreeStyle.module.css';
import HierarchyTree from '../HierarchyTree';
import Store from '../../utils/store';

const LabelsTree = ({ labels }) => (
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
      {_.sortBy(labels, 'name').map(
        ({ name, shape, attributes }) => (
          <HierarchyTree
            key={`${name}-${shape}`}
            content={name}
            canHide
            leftIcon={<FaSquare color={Store.labelColors[`${name}-${shape}`]} style={{ display: 'inline' }} />}
          >
            {attributes.map((attribute) => <HierarchyTree content={attribute} />)}
          </HierarchyTree>
        ),
      )}
    </HierarchyTree>
  </Box>
);

export default view(LabelsTree);
