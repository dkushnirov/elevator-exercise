interface WindowPaneProps {
  x: number;
  y: number;
  width: number;
  height: number;
  numberOfSection: number;
  borderSize: number;
  borderColor: string;
}

function WindowPane({
  x,
  y,
  width,
  height,
  numberOfSection,
  borderSize,
  borderColor,
}: WindowPaneProps) {
  if (numberOfSection < 1) return null;
  const rectWidth = width / numberOfSection;

  const generateSections = () => {
    const sections = [];
    for (let i = 0; i < numberOfSection; i++) {
      const section = (
        <rect
          key={`section-${i}`}
          x={x + i * rectWidth}
          y={y}
          width={rectWidth}
          height={height}
          fill="none"
          stroke={borderColor}
          strokeWidth={borderSize}
        />
      );
      sections.push(section);
    }
    return sections;
  };

  return generateSections();
}

export default WindowPane;
