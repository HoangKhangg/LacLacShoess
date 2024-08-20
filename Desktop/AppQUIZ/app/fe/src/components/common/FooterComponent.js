import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FooterComponent() {
  return (
      <footer>
        <Container>
          <Row>
            <Col className='text-center py-3'>Copyright &copy; BobaShop</Col>
          </Row>
        </Container>
      </footer>
  )
}

export default FooterComponent