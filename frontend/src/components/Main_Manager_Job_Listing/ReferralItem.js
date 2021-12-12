import React, { useState, useEffect } from "react";
import { Row, Col, Modal } from "react-bootstrap"
import ReferCSS from "./MainManagerJobListing.module.css"
import { apiGetPDF } from "../../utils/api-fetch";

const ReferralItem = (props) => {
    const [show, setShow] = useState(false);
    console.log(props);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [resume, setResume] = useState("")

    async function getResume() {
        // if (props.resumeId)
        return await apiGetPDF(`/referral/file?id=${props.resumeId}`);
    }

    const base64toBlob = (data) => {
        const bytes = atob(data);
        let length = bytes.length;
        let out = new Uint8Array(length);
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
        return new Blob([out], { type: 'application/pdf' });
    };

    useEffect(() => {
        getResume()
            .then(r => r.text())
            .then(r => {
                const blob = base64toBlob(r);
                const fileURL = URL.createObjectURL(blob)
                setResume(fileURL);
            })
    }
        , [props.id])

    return (
        <React.Fragment>
            <button style={{ display: "flex", flexDirection: "row", background: "transparent", width: "100%", border: "0" }} onClick={handleShow}>
                <Row className={`${ReferCSS.positionContainer}`} style={{ justifyContent: "center", alignItems: "center" }}>
                    <Col lg={2}><h6 className='text-center'>{props.id}</h6></Col>
                    <Col lg={3}><h6 className='text-center'>{props.referee ? `${props.referee.firstName} ${props.referee?.lastName}` : props.refereeName} </h6></Col>
                    <Col lg={3}><h6 className='text-center'>{props.referrer?.firstName} {props.referrer?.lastName}</h6></Col>
                    <Col lg={4}><h6 className='text-center'>{props.referee ? props.referee.email : props.refereeEmail}</h6></Col>
                </Row>
            </button>
            <Modal size="xl" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2>Referral #{props.id}</h2></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row style={{ justifyContent: "center", alignItems: "center" }}>
                        <Col style={{ padding: "0em 2em" }}>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <h4 style={{ textAlign: "left" }}>Referee Details</h4>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Employee ID: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referee ? props.referee.id : "Not Applicable"} </h6></Col>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Full Name: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referee ? `${props.referee.firstName} ${props.referee?.lastName}` : props.refereeName} </h6></Col>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Email: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referee ? props.referee.email : props.refereeEmail}</h6></Col>
                            </Row>
                        </Col>
                        <Col style={{ padding: "0em 2em" }}>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <h4 style={{ textAlign: "left" }}>Referrer Details</h4>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Employee ID: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referrer?.id} </h6></Col>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Full Name: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referrer?.firstName} {props.referrer?.lastName} </h6></Col>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <Col lg={3}><h6 style={{ textAlign: "left" }}>Email: </h6></Col>
                                <Col><h6 style={{ textAlign: "left" }}>{props.referrer?.email}</h6></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <Col style={{ textAlign: "center", padding: "0em 2em" }}>
                            <h4>Description</h4>
                            <h6>{props.description}</h6>
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: "center", alignItems: "center" }}>
                        <Col>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <h4 className='text-center'>Résumé </h4>
                            </Row>
                            <Row style={{ justifyContent: "center", alignItems: "center" }}>
                                <iframe src={resume} title="Resume" style={{ height: "400px" }}></iframe>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default ReferralItem;