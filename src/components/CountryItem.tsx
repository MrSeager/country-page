import { FC } from 'react';
//Bootstrap
import { Row, Col, Image } from 'react-bootstrap';

interface countryProps {
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
    subregion: string,
}
interface CountryItemProps {
    country: countryProps,
    index: number
    independent: boolean,
    unMember: boolean,
}

const CountryItem: FC<CountryItemProps> = ({ country, index }) => {
    return (
        <Row key={index} className='fs-5 cs-tc-one'>
            <Col xs={1} className='ps-0'>
                <Image fluid src={country.flags.svg} alt={country.flags.alt} className='cs-flag-img rounded' />
            </Col>
            <Col xs={3} className='p-0 d-flex align-items-center'>
                <h3 className='h5 m-0'>{country.name.common}</h3>
            </Col>
            <Col xs={3} className='p-0 d-flex align-items-center'>
                <h3 className='h5 m-0'>{country.population.toLocaleString()}</h3>
            </Col>
            <Col xs={3} className='p-0 d-flex align-items-center'>
                <h3 className='h5 m-0'>{country.area.toLocaleString()}</h3>
            </Col>
            <Col xs={2} className='p-0 d-flex align-items-center'>
                <h3 className='h5 m-0'>{country.region}</h3>
            </Col>
        </Row>
    );
}

export default CountryItem;