import { FC } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Col, Button, ButtonToolbar, ButtonGroup, Dropdown, Form } from 'react-bootstrap';
//Icons
import { IoIosArrowDown } from "react-icons/io";

interface NavPanelProps {
    sortBy: string,
    setSortBy: (sortBy: string) => void,
    toggleRegion: (region: string) => void,
    filterUNMember: boolean,
    setFilterUNMember: (filterUNMember: boolean) => void,
    filterIndependent: boolean,
    setFilterIndependent: (filterIndependent: boolean) => void,
    selectedRegions: string[],
}

const NavPanel: FC<NavPanelProps> = ({ sortBy, setSortBy, toggleRegion, filterUNMember, setFilterUNMember, filterIndependent, setFilterIndependent, selectedRegions }) => {
    return (
        <Col lg={3} xs={12} className='pt-5 d-flex flex-column gap-4 pe-lg-3 px-0'>
            <Container fluid className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Sort by</h2>
                <Dropdown drop='down' className='cs-dropdown'>
                    <Dropdown.Toggle 
                        id="dropdown-basic" 
                        className='bg-transparent cs-transition cs-tc-one py-2 rounded-3 cs-border-color w-100 d-flex align-items-center justify-content-between'
                    >
                        {sortBy === 'population'
                            ? 'Population'
                            : 'Alphabetical'
                        }
                        <IoIosArrowDown size={20} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='w-100 cs-bg-second border cs-border-color py-0 overflow-hidden'>
                        <Dropdown.Item className='cs-tc-one cs-transition py-2' onClick={() => setSortBy('population')}>Population</Dropdown.Item>
                        <Dropdown.Item className='cs-tc-one cs-transition py-2' onClick={() => setSortBy('alphabetical')}>Alphabetical</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Container fluid className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Region</h2>
                <ButtonToolbar className='d-flex flex-lg-column flex-row align-items-start gap-3'>
                    <ButtonGroup className='gap-3'>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Americas') ? '-active' : ''}`} onClick={() => toggleRegion('Americas')}>Americas</Button>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Antarctic') ? '-active' : ''}`} onClick={() => toggleRegion('Antarctic')}>Antarctic</Button>
                    </ButtonGroup>
                    <ButtonGroup className='gap-3'>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Africa') ? '-active' : ''}`} onClick={() => toggleRegion('Africa')}>Africa</Button>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Asia') ? '-active' : ''}`} onClick={() => toggleRegion('Asia')}>Asia</Button>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Europe') ? '-active' : ''}`} onClick={() => toggleRegion('Europe')}>Europe</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type='button' variant='custom' className={`cs-transition cs-tc-one border-0 rounded-3 cs-btn${selectedRegions.includes('Oceania') ? '-active' : ''}`} onClick={() => toggleRegion('Oceania')}>Oceania</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Container>
            <Container fluid className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Status</h2>
                <Form className='cs-tc-one ps-1'>
                    <Form.Check
                        type='checkbox'
                        label='Member of the United Nations'
                        className='cs-checkbox mb-2'
                        checked={filterUNMember}
                        onChange={() => setFilterUNMember(!filterUNMember)}
                    />
                    <Form.Check
                        type='checkbox'
                        label='Independent'
                        className='cs-checkbox'
                        checked={filterIndependent}
                        onChange={() => setFilterIndependent(!filterIndependent)}
                    />
                </Form>
            </Container>
        </Col>
    );
}

export default NavPanel;