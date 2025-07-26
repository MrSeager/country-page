import { useSpring } from '@react-spring/web';

export const useHover = ( hover: boolean, scl: number ) => 
    useSpring({
        scale: hover ? scl : 1,
        config: { tension: 110, friction: 10 },
    });

export const useScale = ( del: number ) =>
    useSpring({
        from: { transform: 'scaleY(0)' },
        to: { transform: 'scaleY(1)' },
        config: { tension: 180, friction: 15 },
        delay: del,
    });

export const useBgHover = ( hover: boolean ) =>
    useSpring({
        backgroundColor: hover ? '#6C727F' : 'transparent',
        config: { tension: 110, friction: 10 },
    });

export const useFillingUpHover = ( hover: boolean ) => 
    useSpring({
        width: hover ? '100%' : '0%',
        backgroundColor: '#282B30',
        config: { tension: 200, friction: 20 }
    });
