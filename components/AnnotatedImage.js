import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text, Group } from 'react-konva';
import { Image } from 'react-konva';
import useImage from 'use-image';
import chunk from 'lodash.chunk';

import { getRandomColors } from "../utils/colors";

const Tooltip = ({ label, score, attributes, x, y }) => (
    <Text text={`Label: ${label}`} x={x} y={y} fontSize={16} fontStyle="bold" fill="white" />
)


const BoundingBox = ({ box, label, score, attributes, image_width, image_height }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleOnMouseEnter = (e) => setShowTooltip(true);
    const handleOnMouseLeave = (e) => setShowTooltip(null);

    return (
        <Group>
            <Rect
                x={box[0] * image_width}
                y={box[1] * image_height}
                width={(box[2] - box[0]) * image_width}
                height={(box[3] - box[1]) * image_height}
                stroke={getRandomColors(1)[0]}
                strokeWidth={2}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
            />
            {showTooltip && (
                <Tooltip
                    attributes={attributes}
                    label={label}
                    score={score}
                    x={(box[2] - box[0]) * image_width}
                    y={box[1] * image_height}
                />
            )}
        </Group>
    )
}


const Polyline = ({ points, label, score, attributes, image_width, image_height, ...rest }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleOnMouseEnter = (e) => setShowTooltip(true);
    const handleOnMouseLeave = (e) => setShowTooltip(null);

    return (
        <Group>
            <Line
                points={points.map((x, i) => i % 2 ? x * image_height : x * image_width)}
                stroke={getRandomColors(1)[0]}
                fill={getRandomColors(1)[0]}
                strokeWidth={2}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                opacity={0.5}
                {...rest}
            />
        </Group>
    )
}

const Keypoints = ({ points, label, score, attributes, image_width, image_height, ...rest }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const handleOnMouseEnter = (e) => setShowTooltip(true);
    const handleOnMouseLeave = (e) => setShowTooltip(null);

    return (
        <Group>
            {chunk(points, 2).map(([x, y]) => (
                <Circle
                    x={x * image_width}
                    y={y * image_height}
                    points={points}
                    stroke={getRandomColors(1)[0]}
                    radius={6}
                    strokeWidth={2}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                    {...rest}
                />
            ))}
        </Group>
    )
}


const AnnotatedImage = ({ image_url, annotations, image_width, image_height }) => {
    const [image] = useImage(image_url);
    const { detections, polygons, polylines, points, tags } = annotations

    return (
        <Stage width={image_width} height={image_height}>
            <Layer>
                <Image image={image} width={image_width} height={image_height} />
                {detections.map(det => (
                    <BoundingBox image_width={image_width} image_height={image_height} {...det} />
                ))}
                {polygons.map(poly => (
                    <Polyline image_width={image_width} image_height={image_height} {...poly} closed />
                ))}
                {polylines.map(poly => (
                    <Polyline image_width={image_width} image_height={image_height} {...poly} />
                ))}
                {points.map(pointsGroup => (
                    <Keypoints image_width={image_width} image_height={image_height} {...pointsGroup} />
                ))}
            </Layer>
        </Stage>
    )
}

export default AnnotatedImage
