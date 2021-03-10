import React, { useCallback } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { view } from '@risingstack/react-easy-state';
import Store from '../utils/store';
import AnnotatedImage from './AnnotatedImage';

const ImagesGrid = ({ annotations, columns = 4 }) => {
  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const data = annotations[rowIndex * columns + columnIndex];

    if (!data) return null;

    return (
      <AnnotatedImage
        key={rowIndex * columns + columnIndex}
        annotations={data}
        imageUrl={data.thumbnailUrl}
        imageWidth={data.imageWidth}
        imageHeight={data.imageHeight}
        labelColors={Store.labelColors}
        hiddenLabels={Store.hiddenLabels}
        style={style}
      />
    );
  }, [annotations]);

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Grid
          columnCount={columns}
          columnWidth={width / columns}
          height={height}
          rowCount={Math.ceil(annotations.length / columns)}
          rowHeight={(9 / 16) * (width / columns)}
          width={width}
          cellRenderer={Cell}
        />
      )}
    </AutoSizer>
  );
};

export default view(ImagesGrid);
