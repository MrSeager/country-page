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
    const [sortBy, setSortBy] = useState<string>('population');
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [filterUNMember, setFilterUNMember] = useState<boolean>(false);
    const [filterIndependent, setFilterIndependent] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const sortedCountries = [...countriesList].sort((a, b) => {
        if (sortBy === 'population') {
            return b.population - a.population;
        }
        if (sortBy === 'alphabetical') {
            return a.name.common.localeCompare(b.name.common);
        }
        return 0;
    });

    const toggleRegion = (region: string) => {
        setSelectedRegions(prev => 
            prev.includes(region)
            ? prev.filter(r => r !== region)
            : [...prev, region]
        )
    }

    const filteredCountries = sortedCountries.filter(country => {
        const regionMatch =
            selectedRegions.length === 0 || selectedRegions.includes(country.region);

        const unMemberMatch = !filterUNMember || country.unMember;
        const independentMatch = !filterIndependent || country.independent;

        const term = searchTerm.toLowerCase();
        const nameMatch = country.name.common.toLowerCase().includes(term);
        const regionSearchMatch = country.region?.toLowerCase().includes(term);
        const subregionMatch = country.subregion?.toLowerCase().includes(term);

        const searchMatch = !term || nameMatch || regionSearchMatch || subregionMatch;

        return regionMatch && unMemberMatch && independentMatch && searchMatch;
    });

    return (
        <Container fluid className='user-select-none min-vh-100 d-flex flex-column align-items-center justify-content-around cs-bg-main'>
            <Image fluid src={LogoImg} alt='logo' className='my-5 py-5' />
            <Container className='mb-5 cs-border rounded-3 cs-bg-second p-4 shadow cs-bc-one'>
                <Row>
                    <Col lg={8} xs={12}>
                        <h1 className='my-0 h3 cs-tc-one'>Found {filteredCountries.length} countries</h1>
                    </Col>
                    <Col lg={4} xs={12} className='d-flex flex-column align-items-center justify-content-center'>
                        <InputGroup className=''>
                            <InputGroup.Text className='rounded-start-3 cs-bg-therd border-0 cs-tc-one'>
                                <FiSearch size={20} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder='Search by Name, Region, Subregion'
                                area-label='Search'
                                className='cs-formcontrol py-2 rounded-end-3 shadow-none border-0 cs-bg-therd cs-tc-one'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </InputGroup>
                    </Col>
                    <NavPanel
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        toggleRegion={toggleRegion}
                        filterUNMember={filterUNMember}
                        setFilterUNMember={setFilterUNMember}
                        filterIndependent={filterIndependent}
                        setFilterIndependent={setFilterIndependent}
                        selectedRegions={selectedRegions}
                    />
                    <CountriesListSection 
                        countriesList={filteredCountries}
                    />
                </Row>
            </Container>
        </Container>
    );
}

export default CountryPage;