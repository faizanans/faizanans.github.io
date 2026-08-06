import styles from './Pipeline.module.css';

/* Diagram geometry. The SVG is scaled down to fit its card, so keep the
   viewBox tight — every extra unit of width shrinks the labels. */
const NODE_W = 108;
const NODE_H = 46;
const NODE_Y = 44;
const GAP = 36;
const WIRE_Y = NODE_Y + NODE_H / 2;

const CACHE_Y = 124;
const CACHE_H = 38;

interface Node {
  stage: string;
  label: string;
  accent?: boolean;
}

const nodes: Node[] = [
  { stage: 'ingest', label: 'Kafka' },
  { stage: 'process', label: 'Spring Boot', accent: true },
  { stage: 'store', label: 'Druid' },
  { stage: 'serve', label: 'REST API' },
];

const xOf = (i: number) => 4 + i * (NODE_W + GAP);
const centerOf = (i: number) => xOf(i) + NODE_W / 2;

const SERVICE = 1;
const VIEW_W = xOf(nodes.length - 1) + NODE_W + 4;
const DROP = CACHE_Y - (NODE_Y + NODE_H);

export function Pipeline() {
  return (
    <>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEW_W} 172`}
        aria-hidden="true"
        focusable="false"
        /* Packet animations travel exactly one connector length. */
        style={
          {
            '--travel-x': `${GAP}px`,
            '--travel-y': `${DROP - 8}px`,
          } as React.CSSProperties
        }
      >
        {/* Connectors, drawn beneath the nodes */}
        {nodes.slice(0, -1).map((node, i) => {
          const from = xOf(i) + NODE_W;
          const to = xOf(i + 1);
          return (
            <g key={`wire-${node.label}`}>
              <line
                className={styles.wire}
                x1={from}
                y1={WIRE_Y}
                x2={to}
                y2={WIRE_Y}
              />
              <line
                className={styles.flow}
                x1={from}
                y1={WIRE_Y}
                x2={to}
                y2={WIRE_Y}
                style={{ animationDelay: `${i * 0.22}s` }}
              />
              <polygon
                className={styles.arrow}
                points={`${to - 5},${WIRE_Y - 3.5} ${to},${WIRE_Y} ${to - 5},${WIRE_Y + 3.5}`}
              />
              <circle
                className={styles.packet}
                cx={from}
                cy={WIRE_Y}
                r={2.5}
                style={{ animationDelay: `${i * 0.55}s` }}
              />
            </g>
          );
        })}

        {/* Redis branch hanging off the processing node */}
        <line
          className={styles.wire}
          x1={centerOf(SERVICE)}
          y1={NODE_Y + NODE_H}
          x2={centerOf(SERVICE)}
          y2={CACHE_Y}
        />
        <circle
          className={styles.packetDown}
          cx={centerOf(SERVICE)}
          cy={NODE_Y + NODE_H + 4}
          r={2.25}
        />
        <rect
          className={styles.node}
          x={xOf(SERVICE)}
          y={CACHE_Y}
          width={NODE_W}
          height={CACHE_H}
          rx={8}
        />
        <text
          className={styles.label}
          x={centerOf(SERVICE)}
          y={CACHE_Y + CACHE_H / 2 + 4}
          textAnchor="middle"
        >
          Redis
        </text>
        <text
          className={styles.stage}
          x={xOf(SERVICE) + NODE_W + 12}
          y={CACHE_Y + CACHE_H / 2 + 3}
        >
          cache
        </text>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.label}>
            <text
              className={styles.stage}
              x={centerOf(i)}
              y={NODE_Y - 14}
              textAnchor="middle"
            >
              {node.stage}
            </text>
            <rect
              className={`${styles.node} ${node.accent ? styles.nodeAccent : ''}`}
              x={xOf(i)}
              y={NODE_Y}
              width={NODE_W}
              height={NODE_H}
              rx={9}
            />
            {node.accent && (
              <rect
                className={styles.pulseRing}
                x={xOf(i)}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx={9}
              />
            )}
            <text
              className={`${styles.label} ${node.accent ? styles.labelAccent : ''}`}
              x={centerOf(i)}
              y={WIRE_Y + 4}
              textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Screen-reader equivalent of the diagram above. */}
      <p className="sr-only">
        Architecture diagram: events are ingested from Kafka, processed by a
        Spring Boot service backed by a Redis cache, stored in Apache Druid, and
        served through a REST API.
      </p>
    </>
  );
}
