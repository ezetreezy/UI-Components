import React, { useState, useRef, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { Grid } from 'react-virtualized';
import { GridProps, ScrollOffset } from 'react-virtualized/dist/es/Grid';

/* 
   Handles virtualization via windowing
   Thin wrapper around the Grid component for animations
*/

export interface AnimatedGridProps {
  column: number;
  onAnimationComplete?: () => void;
}

export type CombinedProps = AnimatedGridProps & GridProps;

export const AnimatedGrid: React.FC<CombinedProps> = React.memo(
  ({ column, onAnimationComplete, ...gridProps }) => {
    const [scrollLeft, setScrollLeft] = useState(column * 500);
    const gridRef = useRef<Grid>(null);
    const isAnimating = useRef(false);
    const scrollLeftInitial = useRef<ScrollOffset>({ scrollLeft: 0, scrollTop: 0 });
    const scrollLeftFinal = useRef<ScrollOffset>({ scrollLeft: 0, scrollTop: 0 });

    useEffect(() => {
      if (isAnimating) {
        return;
      }

      if (gridRef.current && scrollLeftFinal.current) {
        scrollLeftFinal.current.scrollLeft =
          gridRef.current.getOffsetForCell({ columnIndex: column }).scrollLeft / 300;
      }
    }, [column]);

    useEffect(() => {
      if (gridRef.current) {
        gridRef.current.scrollToPosition({ scrollLeft, scrollTop: 0 });
      }
    }, [scrollLeft]);

    const onScroll = ({ scrollLeft }: { scrollLeft: number }) => {
      if (isAnimating) {
        return;
      }

      if (scrollLeftInitial.current) {
        scrollLeftInitial.current.scrollLeft = scrollLeft;
      }
    };

    console.log('column', column, 'sl', scrollLeft);

    return (
      <Grid
        {...gridProps}
        ref={gridRef}
        scrollLeft={scrollLeft}
        onScroll={onScroll}
        scrollToColumn={undefined}
      />
    );
  }
);
