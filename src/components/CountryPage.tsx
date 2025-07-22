import { FC, useState, useEffect } from 'react';
//Components
import './countryPageStyle.css';
import NavPanel from './NavPanel.tsx';
import CountriesListSection from './CountriesListSection.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Image, Row, Col, Form, InputGroup } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';
//Images
import LogoImg from '../resources/Logo.svg';
//Icons
import { CiSearch } from "react-icons/ci";

interface countriesListProps {
    flags: {
        png: string,
        svg: string,
        alt: string,
    },
    name: {
        common: string,
        official: string,
        nativeName: {
            ron: {
                official: string,
                common: string,
            }
        }
    },
    population: number,
    area: number,
    region: string
}

const CountryPage: FC = () => {
    const [countriesList, setCountriesList] = useState<countriesListProps[]>([]);
    const [sortBy, setSortBy] = useState<string>('population');

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=flags,name,population,area,region`)
            .then(response => {
            console.log('Fetched countries:', response.data);
            setCountriesList(response.data);
        })
        .catch(error => {
            console.error('API error:', error);
        });
    }, []);

    const sortedCountries = [...countriesList].sort((a, b) => {
        if (sortBy === 'population') {
            return b.population - a.population;
        }
        if (sortBy === 'alphabetical') {
            return a.name.common.localeCompare(b.name.common);
        }
        return 0;
    });

    return (
        <Container fluid className='min-vh-100 d-flex flex-column align-items-center justify-content-around cs-bg-main'>
            <Image fluid src={LogoImg} alt='logo' className='my-5 py-5' />
            <Container className='mb-5 cs-border rounded-3 cs-bg-second p-4 shadow cs-bc-one'>
                <Row>
                    <Col lg={8} xs={12}>
                        <h1 className='my-0 h3 cs-tc-one'>Found {countriesList.length > 0 ? countriesList.length : 'Loading...'} countries</h1>
                    </Col>
                    <Col lg={4} xs={12} className='d-flex flex-column align-items-center justify-content-center'>
                        <InputGroup>
                            <InputGroup.Text>
                                <CiSearch />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder='Search by Name, Region, Subregion'
                                area-label='Search'
                            />
                        </InputGroup>
                    </Col>
                    <NavPanel
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <CountriesListSection 
                        countriesList={sortedCountries}
                    />
                </Row>
            </Container>
        </Container>
    );
}

export default CountryPage;