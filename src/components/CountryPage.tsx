import { FC, useState, useEffect } from 'react';
//Components
import './countryPageStyle.css';
import CountriesPage from './CountriesPage.tsx';
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
import { FiSearch } from "react-icons/fi";

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
}

const CountryPage: FC = () => {
    const [countriesList, setCountriesList] = useState<countriesListProps[]>([]);

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all?fields=flags,name,population,area,region,independent,unMember,subregion`)
            .then(response => {
            console.log('Fetched countries:', response.data);
            setCountriesList(response.data);
        })
        .catch(error => {
            console.error('API error:', error);
        });
    }, []);

    return (
        <Container fluid className='cs-w cs-shadow px-lg-5 user-select-none min-vh-100 d-flex flex-column align-items-center justify-content-around cs-bg-main'>
            <Image fluid src={LogoImg} alt='logo' className='my-lg-5 my-0 py-5' />
            <CountriesPage 
                countriesList={countriesList}
            />
        </Container>
    );
}

export default CountryPage;