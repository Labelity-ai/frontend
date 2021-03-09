import React, {
  useRef, useEffect, useCallback, useState,
} from 'react';
import { FaPlus, FaMinus, FaEye } from 'react-icons/fa';

const styles = {
  tree: {
    position: 'relative',
    padding: '4px 0px 0px 0px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  toggle: {
    width: '1em',
    height: '1em',
    marginRight: 10,
    cursor: 'pointer',
    verticalAlign: 'middle',
    display: 'inline',
  },
  type: {
    fontSize: '0.6em',
    verticalAlign: 'middle',
  },
  contents: {
    willChange: 'transform, opacity, height',
    marginLeft: 6,
    padding: '4px 0px 0px 14px',
    borderLeft: '1px dashed rgba(255,255,255,0.4)',
  },
  contentsWrapper: {
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: '5px',
  },
};

const HierarchyTree = ({
  content, canHide, children, style, leftIcon,
}) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleVisibility = useCallback(() => {
    setVisible((x) => !x);
  }, []);

  const toggle = useCallback(() => {
    if (children) setOpen((x) => !x);
  }, [!children]);

  const Icon = open ? FaMinus : FaPlus;
  const childrenList = open ? children : [];

  return (
    <div style={{ ...styles.tree, ...style }}>
      {children && (
        <Icon
          style={{ ...styles.toggle, opacity: children ? 1 : 0.3 }}
          onClick={toggle}
        />
      )}
      {canHide && (
        <FaEye
          style={{ ...styles.toggle, opacity: visible ? 1 : 0.4 }}
          onClick={toggleVisibility}
        />
      )}
      <span style={{ ...styles.contentsWrapper, width: leftIcon ? '70%' : '90%' }} onClick={toggle}>
        {content}
      </span>
      {leftIcon && <span style={{ verticalAlign: 'middle' }}>{leftIcon}</span>}
      {childrenList.map((child) => <div style={styles.contents}>{child}</div>)}
    </div>
  );
};

export default HierarchyTree;
