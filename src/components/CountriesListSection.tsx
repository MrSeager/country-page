import { FC, useState, useEffect } from 'react';
//Components
import './countryPageStyle.css';
import NavPanel from './NavPanel.tsx';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Table, Image, Spinner } from 'react-bootstrap';
//Axios
import axios from 'axios';
//Spring
import { useSpring, animated } from '@react-spring/web';

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

interface CountriesListSectionProps {
    countriesList: countriesListProps[],
}

const CountriesListSection: FC<CountriesListSectionProps> = ({ countriesList }) => {
    return (
        <Col lg={9} xs={12} className='py-5'>
            <Table>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th>Name</th>
                        <th>Population</th>
                        <th>Area (km²)</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {countriesList.length > 0 ? (
                        countriesList.map((country, index) => (
                            <tr key={index} tabIndex={index}>
                                <td><Image fluid src={country.flags.svg} alt={country.flags.alt} className='cs-flag-img rounded' /></td>
                                <td>{country.name.common}</td>
                                <td>{country.population}</td>
                                <td>{country.area}</td>
                                <td>{country.region}</td>
                            </tr>
                        ))
                    ) : <Spinner className='mx-auto my-5' animation="grow" variant="light" role='status' />}
                </tbody>
            </Table>
        </Col>
    );
}

export default CountriesListSection;