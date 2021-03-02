import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text, Group } from "react-konva";
import { Image } from "react-konva";
import useImage from "use-image";
import chunk from "lodash.chunk";
import hexRgb from "hex-rgb";

const Tooltip = ({ label, score, attributes, x, y }) => (
  <Text
    text={`Label: ${label}`}
    x={x}
    y={y}
    fontSize={16}
    fontStyle="bold"
    fill="white"
  />
);

const BoundingBox = ({
  box,
  label,
  score,
  attributes,
  imageWidth,
  imageHeight,
  color,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleOnMouseEnter = (e) => setShowTooltip(true);
  const handleOnMouseLeave = (e) => setShowTooltip(null);

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
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      {showTooltip && (
        <Tooltip
          attributes={attributes}
          label={label}
          score={score}
          x={(box[2] - box[0]) * imageWidth}
          y={box[1] * imageHeight}
        />
      )}
    </Group>
  );
};

const Polyline = ({
  points,
  label,
  score,
  attributes,
  imageWidth,
  imageHeight,
  color,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleOnMouseEnter = (e) => setShowTooltip(true);
  const handleOnMouseLeave = (e) => setShowTooltip(null);
  const fillColor = hexRgb(color);

  return (
    <Group>
      <Line
        points={points.map((x, i) =>
          i % 2 ? x * imageHeight : x * imageWidth
        )}
        stroke={color}
        fill={`rgba(${fillColor.red}, ${fillColor.green}, ${fillColor.blue}, 0.6)`}
        strokeWidth={2}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        {...rest}
      />
    </Group>
  );
};

const Keypoints = ({
  points,
  label,
  score,
  attributes,
  imageWidth,
  imageHeight,
  color,
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const handleOnMouseEnter = (e) => setShowTooltip(true);
  const handleOnMouseLeave = (e) => setShowTooltip(null);

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
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          {...rest}
        />
      ))}
    </Group>
  );
};

const AnnotatedImage = ({
  imageUrl,
  annotations,
  imageWidth,
  imageHeight,
  labelColors,
}) => {
  const [image] = useImage(imageUrl);
  const { detections, polygons, polylines, points, tags } = annotations;

  return (
    <Stage width={imageWidth} height={imageHeight}>
      <Layer>
        <Image image={image} width={imageWidth} height={imageHeight} />
        {detections.map((det) => (
          <BoundingBox
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            color={labelColors[det.label]}
            {...det}
          />
        ))}
        {polygons.map((poly) => (
          <Polyline
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            color={labelColors[poly.label]}
            closed
            {...poly}
          />
        ))}
        {polylines.map((poly) => (
          <Polyline
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            color={labelColors[poly.label]}
            {...poly}
          />
        ))}
        {points.map((pointsGroup) => (
          <Keypoints
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            color={labelColors[pointsGroup.label]}
            {...pointsGroup}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default AnnotatedImage;
