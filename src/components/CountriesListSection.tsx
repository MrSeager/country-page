import { FC } from 'react';
//Components
import CountryItem from './CountryItem.tsx';
//Bootstrap
import { Row, Col, Spinner } from 'react-bootstrap';

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
    region: string
    independent: boolean,
    unMember: boolean,
    subregion: string,
}

interface CountriesListSectionProps {
    countriesList: countriesListProps[],
}

const CountriesListSection: FC<CountriesListSectionProps> = ({ countriesList }) => {
    return (
        <Col lg={9} xs={12} className='py-5 d-flex flex-column gap-4'>
            <Row className='cs-tc-one border-bottom pb-2'>
                <Col xs={1} className='p-0'>
                    <h3 className='h6'>Flag</h3>
                </Col>
                <Col xs={3} className='p-0'>
                    <h3 className='h6'>Name</h3>
                </Col>
                <Col xs={3} className='p-0'>
                    <h3 className='h6'>Population</h3>
                </Col>
                <Col xs={3} className='p-0'>
                    <h3 className='h6'>Area (km²)</h3>
                </Col>
                <Col xs={2} className='p-0'>
                    <h3 className='h6'>Region</h3>
                </Col>
            </Row>
            
            {countriesList.length > 0 ? (
                countriesList.map((country, index) => (
                    <CountryItem 
                        country={country}
                        index={index}
                    />
                ))
            ) : <Spinner className='mx-auto my-5' animation="grow" variant="light" role='status' />}
        </Col>
    );
}

export default CountriesListSection;