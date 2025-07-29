import { FC, useState } from 'react';
//Components
import { useFillingUpHover } from './anim.tsx';
//Bootstrap
import { Row, Col, Image } from 'react-bootstrap';
//Spring
import { animated } from '@react-spring/web';

interface countriesListProps {
    flags: {
        png: string,
        svg: string,
        alt: string,
    },
    name: {
        common: string,
        official: string,
    },
    population: number,
    area: number,
    region: string,
    independent: boolean,
    unMember: boolean,
    subregion: string,
    capital: string,
    languages: {
        [key: string]: string,
    },
    currencies?: {
        [code: string]: {
            name: string,
            symbol: string,
        },
    },
    borders: string[],
    cca3: string,
}

interface CountryItemProps {
    country: countriesListProps,
    index: number,
    handleShowInfo: (show: boolean, index: number) => void,
}

const CountryItem: FC<CountryItemProps> = ({ country, index, handleShowInfo }) => {
    const [hovered, setHovered] = useState<boolean>(false);
    
    const animHoverFill = useFillingUpHover(hovered);

    return (
        <Row  
            key={index} 
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => handleShowInfo(true, index)}
            className='fs-5 cs-tc-one rounded position-relative cs-pointer'
        >
            <animated.div
                style={animHoverFill}
                className='position-absolute h-100 z-0 rounded' 
            />
            <Col lg={1} xs={2} className='ps-0 z-1'>
                <Image fluid src={country.flags.svg} alt={country.flags.alt} className='cs-flag-img rounded' />
            </Col>
            <Col lg={3} xs={4} className='p-0 d-flex align-items-center z-1'>
                <h3 className='h5 m-0'>{country.name.common}</h3>
            </Col>
            <Col lg={3} xs={4} className='p-0 d-flex align-items-center z-1'>
                <h3 className='h5 m-0'>{country.population.toLocaleString()}</h3>
            </Col>
            <Col lg={3} xs={2} className='p-0 d-flex align-items-center z-1'>
                <h3 className='h5 m-0'>{country.area.toLocaleString()}</h3>
            </Col>
            <Col lg={2} xs={0} className='p-0 d-none d-lg-block d-flex align-items-center z-1'>
                <h3 className='h5 m-0'>{country.region}</h3>
            </Col>
        </Row>
    );
}

export default CountryItem;