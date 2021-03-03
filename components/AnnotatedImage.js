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

const TAG_HEIGHT = 20;
const TAG_SPACING = 20;
const TAG_PADDING = 10;

const Tooltip = ({
  label, score, attributes, x, y,
}) => (
  <Text text={label} x={x} y={y} fontSize={16} fontStyle="bold" fill="white" />
);

const BoundingBox = ({
  box, label, score, attributes, imageWidth, imageHeight, color,
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  return (
    <Group>
      <Rect
        x={box[0] * imageWidth}
        y={box[1] * imageHeight}
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
  points, label, score, attributes, imageWidth, imageHeight, color, ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const handleOnMouseEnter = useCallback((e) => {
    setShowTooltip({ x: e.evt.layerX, y: e.evt.layerY - 20 });
  }, []);

  const handleOnMouseLeave = useCallback((e) => setShowTooltip(null), []);

  const fillColor = hexRgb(color);

  return (
    <Group>
      <Line
        points={points.map((x, i) => (i % 2 ? x * imageHeight : x * imageWidth))}
        stroke={color}
        fill={`rgba(${fillColor.red}, ${fillColor.green}, ${fillColor.blue}, 0.6)`}
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
  points, label, score, attributes, imageWidth, imageHeight, color, ...rest
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
          x={x * imageWidth}
          y={y * imageHeight}
          points={points}
          stroke={color}
          radius={4}
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
  imageUrl, annotations, labelColors, style,
}) => {
  const [tagWidths, setTagWidths] = useState({});
  const { width: imageWidth, height: imageHeight } = style;

  const {
    detections, polygons, polylines, points, tags,
  } = annotations;

  const handleOnTextWidthChanged = useCallback((i, width) => {
    setTagWidths((widths) => ({ ...widths, [i]: width }));
  }, []);

  const getTagX = useCallback((index) => {
    let result = 0;
    for (let i = 0; i < index; i++) {
      result += tagWidths[i] + TAG_SPACING;
    }
    return result;
  }, [tagWidths]);

  return (
    <div style={style}>
      <Image src={imageUrl || 'https://picsum.photos/500/300'} width={imageWidth} height={imageHeight} />
      <div style={{ marginTop: -imageHeight - 6, zIndex: 10 }}>
        <Stage width={imageWidth} height={imageHeight}>
          <Layer>
            {detections.map((det, i) => (
              <BoundingBox
                key={i}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                color={labelColors[det.label]}
                {...det}
              />
            ))}
            {polygons.map((poly, i) => (
              <Polyline
                key={i}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                color={labelColors[poly.label]}
                closed
                {...poly}
              />
            ))}
            {polylines.map((poly, i) => (
              <Polyline
                key={i}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                color={labelColors[poly.label]}
                {...poly}
              />
            ))}
            {points.map((pointsGroup, i) => (
              <Keypoints
                key={i}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                color={labelColors[pointsGroup.label]}
                {...pointsGroup}
              />
            ))}
            {tags.map((tag, i) => (getTagX(i) + (tagWidths[i] || 0) < imageWidth ? (
              <Tag
                key={i}
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                color={labelColors[tag.label]}
                onTextWidthChanged={(width) => handleOnTextWidthChanged(i, width)}
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

export default AnnotatedImage;
