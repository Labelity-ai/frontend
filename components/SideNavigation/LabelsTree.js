import React from 'react';
import { Box } from '@chakra-ui/react';
import { FaSquare } from 'react-icons/fa';
import styles from './LabelsTreeStyle.module.css';
import HierarchyTree from '../HierarchyTree';

const LabelsTree = ({ labels }) => (
  <Box width="100%" color="white" fill="white" className={styles.labelsTree} fontSize={13}>
    <HierarchyTree content="Ground truth" canHide>
      <HierarchyTree content="car" canHide leftIcon={<FaSquare color="red" style={{ display: 'inline' }} />}>
        <HierarchyTree content="is_blurry" canHide />
        <HierarchyTree content="is_expensive" canHide />
        <HierarchyTree content="uniqueness" canHide />
      </HierarchyTree>
      <HierarchyTree content="person person person person person" canHide leftIcon={<FaSquare color="cian" style={{ display: 'inline' }} />}>
        <HierarchyTree content="is_blurry" canHide />
        <HierarchyTree content="is_wearing_mask" canHide />
        <HierarchyTree content="uniqueness" canHide />
      </HierarchyTree>
    </HierarchyTree>
    <HierarchyTree content="Predictions" canHide>
      <HierarchyTree content="car" canHide leftIcon={<FaSquare color="red" style={{ display: 'inline' }} />}>
        <HierarchyTree content="is_blurry" canHide />
        <HierarchyTree content="is_expensive" canHide />
        <HierarchyTree content="score" canHide />
      </HierarchyTree>
      <HierarchyTree content="person" canHide leftIcon={<FaSquare color="cyan" style={{ display: 'inline' }} />}>
        <HierarchyTree content="is_blurry" canHide />
        <HierarchyTree content="is_wearing_mask" canHide />
        <HierarchyTree content="score" canHide />
      </HierarchyTree>
    </HierarchyTree>
  </Box>
);

export default LabelsTree;
