import { FC, useState } from 'react';
//Components
import './countryPageStyle.css';
import NavPanel from './NavPanel.tsx';
import CountriesListSection from './CountriesListSection.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Form, InputGroup, Modal, Image } from 'react-bootstrap';
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

interface CountriesPageProps {
    countriesList: countriesListProps[],
}

const CountriesPage: FC<CountriesPageProps> = ({ countriesList }) => {
    const [sortBy, setSortBy] = useState<string>('population');
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [filterUNMember, setFilterUNMember] = useState<boolean>(false);
    const [filterIndependent, setFilterIndependent] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [countryIndex, setCountryIndex] = useState<number>(0);

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

    const handleShowInfo = ( index: number ) => {
        setShowInfo(true);
        setCountryIndex(index);
    }

    const handleClose = () => setShowInfo(false);

    return (
        <Container fluid className='mb-3 cs-border rounded-3 cs-bg-second py-4 px-lg-5 px-4 shadow cs-bc-one'>
            <Row>
                <Col lg={8} xs={12} className='py-4 px-0'>
                    <h1 className='my-0 h3 cs-tc-one'>Found {filteredCountries.length} countries</h1>
                </Col>
                <Col lg={4} xs={12} className='px-0 d-flex flex-column align-items-center justify-content-center'>
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
                    handleShowInfo={handleShowInfo}
                />
            </Row>
        
            <Modal
                dialogClassName="cs-modal-width cs-modal-mt shadow"
                show={showInfo}
                onHide={handleClose}
                centered
            >
                <Modal.Header className='cs-pt border-0 d-flex flex-column align-items-center gap-3 cs-tc-one bg-transparent rounded-top-3 position-relative'>
                    <Image 
                        fluid 
                        src={filteredCountries[countryIndex].flags.svg} 
                        alt={filteredCountries[countryIndex].flags.alt} 
                        className='w-50 mx-auto rounded rounded-3 position-absolute cs-pos-flag'
                    />
                    <Modal.Title className='text-center fs-2 fw-bold'>{filteredCountries[countryIndex].name.common}</Modal.Title>
                    <Modal.Title className='text-center fs-5'>{filteredCountries[countryIndex].name.official}</Modal.Title>
                    <Container className='d-flex gap-4'>
                        <Container className='cs-bg-therd d-flex justify-content-center px-4 py-2 rounded-3'>
                            <h3 className='py-1 h5 m-0 pe-3 cs-border-second'>Population</h3>
                            <h3 className='py-1 h5 m-0 ps-3'>{filteredCountries[countryIndex].population.toLocaleString()}</h3>
                        </Container>
                        <Container className='cs-bg-therd d-flex justify-content-center px-4 py-2 rounded-3'>
                            <h3 className='py-1 h5 m-0 pe-3 cs-border-second'>Area (km²)</h3>
                            <h3 className='py-1 h5 m-0 ps-3'>{filteredCountries[countryIndex].area.toLocaleString()}</h3>
                        </Container>
                    </Container>
                </Modal.Header>
                 <Modal.Body className='bg-transparent'>
                    
                 </Modal.Body>
            </Modal>
        </Container>
    );
}

export default CountriesPage;