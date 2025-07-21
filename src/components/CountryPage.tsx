import { FC, useState } from 'react';
//Components
import './countryPageStyle.css';
import NavPanel from './NavPanel.tsx';
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

const CountryPage: FC = () => {
    const [sortBy, setSortBy] = useState<string>('popelation');

    return (
        <Container fluid className='min-vh-100 d-flex flex-column align-items-center justify-content-around cs-bg-main'>
            <Image fluid src={LogoImg} alt='logo' className='my-5 py-5' />
            <Container className='cs-border rounded-3 cs-bg-second p-4 shadow cs-bc-one'>
                <Row className=''>
                    <Col lg={8} xs={12} className=''>
                        <h1 className='my-0 h3 cs-tc-one'>Found X countries</h1>
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
                </Row>
            </Container>
        </Container>
    );
}

export default CountryPage;