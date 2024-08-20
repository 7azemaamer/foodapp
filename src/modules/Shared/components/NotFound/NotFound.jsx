import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import logo from "../../../../assets/imgs/main-logo.png"
import error from "../../../../assets/imgs/404.png"
import vector from "../../../../assets/imgs/Vector.png"
import styles from "./NotFound.module.css"

export default function NotFound() {
  return (
    <Container fluid className={`${styles.notfound} text-center`}>
      <Row className="position-relative">
        <Col>
          <div className={styles.logo}>
            <img src={logo} alt="Logo" />
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center min-vh-100">
        <Col md={6} className={`${styles.col}`}>
          <h1 className={styles.oops}>Oops.</h1>
          <h2 className={styles.pageNotFound}>Page not found</h2>
          <p className={styles.description}>
            This page doesn't exist or was removed!
            <br />
            We suggest you back to home.
          </p>
          <Button href="/" variant="success" className={styles.backButton}>
            Back To Home
          </Button>
        </Col>
        <Col md={6} className={styles.imgs}>
          <img src={vector} alt="Vector" className={styles.vectorImg} />
          <img src={error} alt="404 Error" className={styles.errorImg} />
        </Col>
      </Row>
    </Container>
  )
}
