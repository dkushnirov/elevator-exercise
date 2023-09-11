import WindowPane from './WindowPane';

type BalconyProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  borderSize: number;
  borderColor: string;
};

const numberOfLines = 4;

function Balcony(props: BalconyProps) {
  const { x, y, width, height, borderSize, borderColor } = props;
  const lineY = Math.round((2 / 3) * height);

  const generateLines = () => {
    const lines = [];
    for (let i = 0; i < numberOfLines; i++) {
      const yPosition = y + lineY + i * 4;
      const section = (
        <line
          key={`line-${i}`}
          x1={x}
          y1={yPosition}
          x2={x + width}
          y2={yPosition}
          stroke={borderColor}
          strokeWidth={borderSize}
        />
      );
      lines.push(section);
    }
    return lines;
  };

  return (
    <>
      <WindowPane
        x={x}
        y={y}
        width={width}
        height={height}
        numberOfSection={4}
        borderSize={1}
        borderColor={borderColor}
      />
      {generateLines()}
    </>
  );
}

export default Balcony;
