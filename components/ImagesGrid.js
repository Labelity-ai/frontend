import React, { useCallback, useMemo } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import zipObject from 'lodash/zipObject';
import { getRandomColors } from '../utils/colors';
import AnnotatedImage from './AnnotatedImage';

const ImagesGrid = ({ annotations, labels, columns = 3 }) => {
  const labelColors = useMemo(() => {
    const colors = getRandomColors(labels.length);
    return zipObject(
      labels.map((label) => label.name),
      colors,
    );
  }, [labels]);

  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const data = annotations[rowIndex * columns + columnIndex];

    if (!data) return null;

    return (
      <AnnotatedImage
        key={rowIndex * columns + columnIndex}
        annotations={data}
        imageUrl={data.thumbnail_url}
        imageWidth={style.width}
        imageHeight={style.height}
        labelColors={labelColors}
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
          rowHeight={256}
          width={width}
          cellRenderer={Cell}
        />
      )}
    </AutoSizer>
  );
};

export default ImagesGrid;
