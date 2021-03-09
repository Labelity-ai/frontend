import React, {
  useRef, useEffect, useCallback, useState,
} from 'react';
import { useSpring, animated } from 'react-spring';
import {
  FaPlus, FaMinus, FaEye,
} from 'react-icons/fa';

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

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
};

export const useMeasure = () => {
  const ref = useRef();
  const [bounds, set] = useState({
    left: 0, top: 0, width: 0, height: 0,
  });
  const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)));
  useEffect(() => {
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
};

const Contents = ({ children, style }) => (
  <animated.div style={{ ...style, ...styles.contents }}>
    {children}
  </animated.div>
);

const HierarchyTree = ({
  content, canHide, children, style, leftIcon,
}) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const previous = usePrevious(open);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: open ? viewHeight : 0, opacity: open ? 1 : 0, transform: `translate3d(${open ? 0 : 20}px,0,0)` },
    config: { duration: 200 },
  });

  const toggleVisibility = useCallback(() => {
    setVisible((x) => !x);
  }, []);

  const toggle = useCallback(() => {
    if (children) setOpen((x) => !x);
  }, [!children]);

  const Icon = open ? FaMinus : FaPlus;

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
      <Contents style={{ opacity, height: open && previous === open ? 'auto' : height }}>
        <animated.div style={{ transform }} {...bind}>{children}</animated.div>
      </Contents>
    </div>
  );
};

export default HierarchyTree;
