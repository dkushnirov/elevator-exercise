import styled from 'styled-components';
import { memo } from 'react';
import Balcony from './Balcony';
import WindowPane from './WindowPane';

type MultiStoryBuildingProps = {
  floors: number;
  floorHeight: number;
  floorWidth: number;
  numberOfElevators: number;
};

const BORDER_SIZE = 1;
const BORDER_COLOR = '#888888';
const FLOOR_COLOR = '#1e1e1e';
const SPACING = 0.02; // by %
const FLOOR_SPACING = 8; // by px
const NUMBER_OF_SECTION = 4;
const WINDOW_WIDTH = 68;
const ELEVATOR_WIDTH = 68;
const CALL_BUTTON_PANEL_WIDTH = 72;

export const SvgContainer = styled.svg`
  display: block;
  margin: 0 auto;
`;

const createRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor: string,
  strokeColor?: string
) => {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fillColor}
      stroke={strokeColor ?? 'none'}
    />
  );
};

function MultiStoryBuilding({
  floors,
  floorHeight,
  floorWidth,
  numberOfElevators,
}: MultiStoryBuildingProps) {
  const generateWindows = (yPosition: number, height: number) => {
    const windowElements = [];
    const windowSpacing = floorWidth * SPACING;
    const numberOfWindows = Math.floor(
      (floorWidth -
        numberOfElevators * (ELEVATOR_WIDTH + windowSpacing) -
        CALL_BUTTON_PANEL_WIDTH) /
        (WINDOW_WIDTH + windowSpacing)
    );

    for (let i = 0; i < Math.floor(numberOfWindows / 2); i++) {
      const xPositionStart = i * (WINDOW_WIDTH + windowSpacing) + windowSpacing;
      const xPositionEnd =
        floorWidth - (i + 1) * (WINDOW_WIDTH + windowSpacing);

      const windowComponent = (x: number) =>
        i === 0 ? (
          <Balcony
            key={`balcony-${i}-${x}`}
            x={x}
            y={yPosition}
            width={WINDOW_WIDTH}
            height={height}
            borderSize={BORDER_SIZE}
            borderColor={BORDER_COLOR}
          />
        ) : (
          <WindowPane
            key={`windowPane-${i}-${x}`}
            x={x}
            y={yPosition}
            width={WINDOW_WIDTH}
            height={height / 2}
            numberOfSection={NUMBER_OF_SECTION}
            borderSize={BORDER_SIZE}
            borderColor={BORDER_COLOR}
          />
        );

      windowElements.push(windowComponent(xPositionStart));
      windowElements.push(windowComponent(xPositionEnd));
    }

    return windowElements;
  };

  const generateFloors = (startYPosition: number) => {
    const floorElements = [];

    for (let i = 0; i < floors; i++) {
      const yPosition = i * floorHeight + startYPosition;
      const floor = (
        <g key={`floor-${i}`}>
          {createRect(0, yPosition, floorWidth, floorHeight, FLOOR_COLOR)}
          {generateWindows(
            yPosition + FLOOR_SPACING,
            floorHeight - FLOOR_SPACING
          )}
        </g>
      );

      floorElements.push(floor);
    }

    return floorElements;
  };

  return (
    <SvgContainer
      viewBox={`0 0 ${floorWidth} ${floors * floorHeight}`}
      width={floorWidth}
    >
      {generateFloors(0)}
    </SvgContainer>
  );
}

export default memo(MultiStoryBuilding);
