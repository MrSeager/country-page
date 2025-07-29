import { FC, useState, useEffect } from 'react';
//Components

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Modal, Image } from 'react-bootstrap';

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

interface CountryDetailsProps {
    showInfo: boolean,
    handleShowInfo: (show: boolean, index: number | null) => void,
    countriesList: countriesListProps[],
    countryInfo: countriesListProps,
}

const CountryDetails: FC<CountryDetailsProps> = ({ showInfo, handleShowInfo, countriesList, countryInfo }) => {
    const [borderedCountries, setBorderedCountries] = useState<countriesListProps[]>([]);
    
    const formatCurrencyNames = (currenciesObj?: {
        [code: string]: { name: string; symbol?: string };
        }): string => {
        if (!currenciesObj) return 'N/A';
            return Object.values(currenciesObj)
                .map(currency => currency.name)
                .join(', ');
    };

    useEffect(() => {
        if (countryInfo && countryInfo.borders && countriesList.length > 0) {
            const neighbors = countryInfo.borders
            .map(code => countriesList.find(c => c.cca3 === code))
            .filter((c): c is countriesListProps => c !== undefined); // remove nulls

            setBorderedCountries(neighbors);
        } else {
            setBorderedCountries([]);
        }
    }, [countryInfo, countriesList]);

    return (
        <Modal
            size='lg'
            dialogClassName="cs-modal-mt shadow user-select-none"
            show={showInfo}
            onHide={() => handleShowInfo(false, null)}
            centered
        >
            <Modal.Header className='cs-border border-bottom-0 d-flex flex-column align-items-center gap-3 cs-tc-one bg-transparent rounded-top-3'>
                <Container className='w-75 overflow-visible position-relative'>
                    <Image 
                        fluid 
                        src={countryInfo.flags.svg} 
                        alt={countryInfo.flags.alt} 
                        className='rounded rounded-3 cs-image-out'
                    />
                </Container>
                <Modal.Title className='text-center fs-2 fw-bold'>{countryInfo.name.common}</Modal.Title>
                <Modal.Title className='text-center fs-5'>{countryInfo.name.official}</Modal.Title>
                <Container className='d-flex flex-lg-row flex-column gap-4 align-items-center justify-content-center'>
                    <Container className='cs-bg-therd d-flex justify-content-center px-4 py-2 rounded-3'>
                        <h3 className='py-1 h5 m-0 pe-3 cs-border-second'>Population</h3>
                        <h3 className='py-1 h5 m-0 ps-3'>{countryInfo.population.toLocaleString()}</h3>
                    </Container>
                    <Container className='cs-bg-therd d-flex justify-content-center px-4 py-2 rounded-3'>
                        <h3 className='py-1 h5 m-0 pe-3 cs-border-second text-nowrap'>Area (km²)</h3>
                        <h3 className='py-1 h5 m-0 ps-3'>{countryInfo.area.toLocaleString()}</h3>
                    </Container>
                </Container>
            </Modal.Header>
            <Modal.Body className='cs-border bg-transparent p-0 cs-tc-one d-flex flex-column align-items-center'>
                <Container fluid className='py-3 d-flex justify-content-between mx-0 px-4 cs-border-therd'>
                    <h4 className='h5 text-start m-0'>Capital</h4>
                    <h4 className='h5 text-end m-0'>{countryInfo.capital}</h4>
                </Container>
                <Container fluid className='py-3 d-flex justify-content-between mx-0 px-4 cs-border-therd'>
                    <h4 className='h5 text-start m-0'>Subregion</h4>
                    <h4 className='h5 text-end m-0'>{countryInfo.subregion}</h4>
                </Container>
                <Container fluid className='py-3 d-flex justify-content-between mx-0 px-4 cs-border-therd'>
                    <h4 className='h5 text-start m-0'>Language</h4>
                    <h4 className='h5 text-end m-0'>{Object.values(countryInfo.languages).join(', ')}</h4>
                </Container>
                <Container fluid className='py-3 d-flex justify-content-between mx-0 px-4 cs-border-therd'>
                    <h4 className='h5 text-start m-0'>Currencies</h4>
                    <h4 className='h5 text-end m-0'>{formatCurrencyNames(countryInfo.currencies)}</h4>
                </Container>
            </Modal.Body>
            <Modal.Footer className='cs-border cs-tc-one px-0 justify-content-start gap-2 py-3'>
                <h5 className='mx-4'>Neighbouring Countries</h5>
                <Container fluid className='overflow-auto'>
                    <Container fluid className='scroll-track d-flex flex-row align-items-center justify-content-start mx-0'>
                    {borderedCountries.length > 0 ? (
                        borderedCountries.map(country => (
                            <Container key={country.cca3} className='m-0 cs-w-second d-flex flex-column align-items-center gap-2 p-2'>
                                <Image 
                                    fluid 
                                    src={country.flags.svg} 
                                    alt={`Flag of ${country.name.common}`} 
                                    className='cs-flag-img rounded'
                                />
                                <p className='m-0 text-center text-nowrap'>{country.name.common}</p>
                            </Container>
                        ))
                        ) : (
                            <p>No bordering countries</p>
                    )}
                    </Container>
                </Container>
            </Modal.Footer>
        </Modal>
    );
}

export default CountryDetails;