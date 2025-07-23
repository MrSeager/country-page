import { FC } from 'react';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Col, Button, ButtonToolbar, ButtonGroup, Dropdown, Form } from 'react-bootstrap';

interface NavPanelProps {
    sortBy: string,
    setSortBy: (sortBy: string) => void,
    toggleRegion: (region: string) => void,
    filterUNMember: boolean,
    setFilterUNMember: (filterUNMember: boolean) => void,
    filterIndependent: boolean,
    setFilterIndependent: (filterIndependent: boolean) => void,
}

const NavPanel: FC<NavPanelProps> = ({ sortBy, setSortBy, toggleRegion, filterUNMember, setFilterUNMember, filterIndependent, setFilterIndependent }) => {
    return (
        <Col lg={3} xs={12} className='pt-5 d-flex flex-column gap-4'>
            <Container className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Sort by</h2>
                <Dropdown drop='down'>
                    <Dropdown.Toggle id="dropdown-basic">
                        {sortBy === 'population'
                            ? 'Population'
                            : 'Alphabetical'
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSortBy('population')}>Population</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSortBy('alphabetical')}>Alphabetical</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
            <Container className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Region</h2>
                <ButtonToolbar className='d-flex flex-column align-items-start gap-3'>
                    <ButtonGroup>
                        <Button onClick={() => toggleRegion('Americas')}>Americas</Button>
                        <Button onClick={() => toggleRegion('Antarctic')}>Antarctic</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={() => toggleRegion('Africa')}>Africa</Button>
                        <Button onClick={() => toggleRegion('Asia')}>Asia</Button>
                        <Button onClick={() => toggleRegion('Europe')}>Europe</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={() => toggleRegion('Oceania')}>Oceania</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Container>
            <Container className='d-flex flex-column p-0'>
                <h2 className='h6 cs-tc-one'>Status</h2>
                <Form className='cs-tc-one'>
                    <Form.Check
                        type='checkbox'
                        label='Member of the United Nations'
                        checked={filterUNMember}
                        onChange={() => setFilterUNMember(!filterUNMember)}
                    />
                    <Form.Check
                        type='checkbox'
                        label='Independent'
                        checked={filterIndependent}
                        onChange={() => setFilterIndependent(!filterIndependent)}
                    />
                </Form>
            </Container>
        </Col>
    );
}

export default NavPanel;