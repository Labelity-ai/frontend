/* eslint-disable react/no-array-index-key */

import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import {
  Stage, Layer, Rect, Circle, Line, Text, Group,
} from 'react-konva';
import Image from 'next/image';
import chunk from 'lodash.chunk';
import hexRgb from 'hex-rgb';
import { contain, cover } from 'intrinsic-scale';
import { view } from '@risingstack/react-easy-state';

const TAG_HEIGHT = 20;
const TAG_SPACING = 20;
const TAG_PADDING = 10;

const Tooltip = ({
  label, score, attributes, x, y,
}) => (
  <Text text={label} x={x} y={y} fontSize={16} fontStyle="bold" fill="white" />
);

const BoundingBox = ({
  box, label, score, attributes, imageWidth, imageHeight, color, offsetX, offsetY,
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  return (
    <Group>
      <Rect
        x={offsetX + box[0] * imageWidth}
        y={offsetY + box[1] * imageHeight}
        width={(box[2] - box[0]) * imageWidth}
        height={(box[3] - box[1]) * imageHeight}
        stroke={color}
        strokeWidth={2}
        opacity={0.75}
        onMouseLeave={handleOnMouseLeave}
        onMouseMove={handleOnMouseEnter}
      />
      {showTooltip && (
        <Tooltip
          attributes={attributes}
          label={label}
          score={score}
          x={showTooltip.x}
          y={showTooltip.y}
        />
      )}
    </Group>
  );
};

const Tag = ({
  label, score, attributes, imageWidth, imageHeight, color, onTextWidthChanged, x,
}) => {
  const [showTooltip, setShowTooltip] = useState(null);
  const [width, setWidth] = useState(null);
  const textRef = useRef(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.textWidth);
      onTextWidthChanged(textRef.current.textWidth);
    }
  }, [textRef.current]);

  return (
    <Group x={x + 10} y={imageHeight - TAG_HEIGHT - 10}>
      <Rect
        x={0}
        y={0}
        width={width + TAG_PADDING}
        height={TAG_HEIGHT}
        stroke={color}
        cornerRadius={6}
        fill={color}
        onMouseLeave={handleOnMouseLeave}
        onMouseMove={handleOnMouseEnter}
      />
      <Text
        ref={textRef}
        text={label}
        x={TAG_PADDING / 2}
        y={4}
        fontSize={14}
        fontStyle="bold"
        fill="white"
      />
      {showTooltip && (
        <Tooltip
          attributes={attributes}
          label={label}
          score={score}
          x={showTooltip.x}
          y={showTooltip.y}
        />
      )}
    </Group>
  );
};

const Polyline = ({
  points, label, score, attributes, imageWidth, imageHeight, color, offsetX, offsetY, ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  const fillColor = hexRgb(color);
  const absolutePoints = points.map(
    (x, i) => (i % 2 ? offsetY + x * imageHeight : offsetX + x * imageWidth),
  );

  return (
    <Group>
      <Line
        points={absolutePoints}
        stroke={color}
        fill={`rgba(${fillColor.red}, ${fillColor.green}, ${fillColor.blue}, 0.4)`}
        strokeWidth={2}
        onMouseMove={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        {...rest}
      />
      {showTooltip && (
        <Tooltip
          attributes={attributes}
          label={label}
          score={score}
          x={showTooltip.x}
          y={showTooltip.y}
        />
      )}
    </Group>
  );
};

const Keypoints = ({
  points, label, score, attributes, imageWidth, imageHeight, color, offsetX, offsetY, ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  return (
    <Group>
      {chunk(points, 2).map(([x, y]) => (
        <Circle
          x={offsetX + x * imageWidth}
          y={offsetY + y * imageHeight}
          points={points}
          stroke={color}
          radius={3}
          strokeWidth={1.5}
          opacity={0.9}
          onMouseMove={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          {...rest}
        />
      ))}
      {showTooltip && (
        <Tooltip
          attributes={attributes}
          label={label}
          score={score}
          x={showTooltip.x}
          y={showTooltip.y}
        />
      )}
    </Group>
  );
};

const AnnotatedImage = ({
  imageUrl,
  imageWidth = 500,
  imageHeight = 300,
  annotations,
  labelColors,
  style,
  hiddenLabels,
  objectFit = 'cover',
  onClick,
}) => {
  const [tagWidths, setTagWidths] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const { width, height } = style;

  const dimensionsCalculator = objectFit === 'cover' ? cover : contain;

  const {
    width: effectiveImageWidth, height: effectiveImageHeight, x, y,
  } = dimensionsCalculator(width, height, imageWidth, imageHeight);

  const {
    detections, polygons, polylines, points, tags,
  } = annotations;

  const handleOnTextWidthChanged = useCallback((i, w) => {
    setTagWidths((widths) => ({ ...widths, [i]: w }));
  }, []);

  const getTagX = useCallback((index) => {
    let result = 0;
    for (let i = 0; i < index; i++) {
      result += tagWidths[i] + TAG_SPACING;
    }
    return result;
  }, [tagWidths]);

  return (
    <div style={style} onClick={onClick}>
      <Image
        src={imageUrl || 'https://picsum.photos/500/300'}
        width={width}
        height={height}
        objectFit={objectFit}
        onLoad={() => setIsLoaded(true)}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: isLoaded ? 'unset' : 'none',
      }}
      >
        <Stage width={width} height={height}>
          <Layer>
            {detections.map((det, i) => !hiddenLabels[`${det.label}-box`] && (
              <BoundingBox
                key={i}
                imageWidth={effectiveImageWidth}
                imageHeight={effectiveImageHeight}
                offsetX={x}
                offsetY={y}
                color={labelColors[`${det.label}-box`]}
                {...det}
              />
            ))}
            {polygons.map((poly, i) => !hiddenLabels[`${poly.label}-polygon`] && (
              <Polyline
                key={i}
                imageWidth={effectiveImageWidth}
                imageHeight={effectiveImageHeight}
                offsetX={x}
                offsetY={y}
                color={labelColors[`${poly.label}-polygon`]}
                closed
                {...poly}
              />
            ))}
            {polylines.map((poly, i) => !hiddenLabels[`${poly.label}-polyline`] && (
              <Polyline
                key={i}
                imageWidth={effectiveImageWidth}
                imageHeight={effectiveImageHeight}
                offsetX={x}
                offsetY={y}
                color={labelColors[`${poly.label}-polyline`]}
                {...poly}
              />
            ))}
            {points.map((pointsGroup, i) => !hiddenLabels[`${pointsGroup.label}-point`] && (
              <Keypoints
                key={i}
                imageWidth={effectiveImageWidth}
                imageHeight={effectiveImageHeight}
                offsetX={x}
                offsetY={y}
                color={labelColors[`${pointsGroup.label}-point`]}
                {...pointsGroup}
              />
            ))}
            {tags.map((tag, i) => (getTagX(i) + (tagWidths[i] || 0) < width && !hiddenLabels[`${tag.label}-point`] ? (
              <Tag
                key={i}
                imageWidth={effectiveImageWidth}
                imageHeight={effectiveImageHeight}
                color={labelColors[`${points.label}-tag`]}
                onTextWidthChanged={(w) => handleOnTextWidthChanged(i, w)}
                x={getTagX(i)}
                {...tag}
              />
            ) : null))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default view(AnnotatedImage);
