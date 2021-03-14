import React, { useState, useCallback } from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import { view } from '@risingstack/react-easy-state';
import Store from '../utils/store';
import AnnotatedImage from './AnnotatedImage';
import ImageModal from './ImageModal';

const ImagesGrid = ({ annotations, columns = 4 }) => {
  const [modalOpen, setModelOpen] = useState(false);
  const [imageData, setImageData] = useState({});

  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const data = annotations[rowIndex * columns + columnIndex];

    if (!data) return null;

    return (
      <AnnotatedImage
        onClick={() => {
          setImageData(data);
          setModelOpen(true);
        }}
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
    <>
      <ImageModal isOpen={modalOpen} onClose={() => setModelOpen(false)} imageData={imageData} />
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
    </>
  );
};

export default view(ImagesGrid);
