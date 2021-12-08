import React, {useState, useEffect} from "react";
import { Row, Col, Modal, Button } from "react-bootstrap"
import {Link} from "react-router-dom";
import ReferCSS from "./MainManagerJobListing.module.css"
import {apiGetPDF} from "../../utils/api-fetch";
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";

const ReferralItem = (props) => {
    const [show, setShow] = useState(false);
    console.log(props);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [resume, setResume] = useState("")
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    async function getResume() {
        // if (props.resumeId)
        return await apiGetPDF(`/referral/file?id=${props.resumeId}`);
    }

    const onPDFLoadSuccess = ({numPages}) => {
        setNumPages(numPages);
    }


    useEffect(() => {
        getResume()
        // .then(r => r.json())
        .then(r => {
            console.log(r)
            const file = new Blob([r.body], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file)
            // window.open(fileURL);
            setResume(fileURL);
        })
    }
    , [props.id])
    
        return (
            <React.Fragment>
            <button style={{display: "flex", flexDirection: "row", background: "transparent", width: "100%", border: "0"}} onClick={handleShow}>
                <Row className={`${ReferCSS.positionContainer}`} style={{justifyContent: "center", alignItems: "center"}}>
                    <Col lg={2}><h6 className='text-center'>{props.id}</h6></Col>
                    <Col lg={3}><h6 className='text-center'>{props.referee?.firstName} {props.referee?.lastName} </h6></Col>
                    <Col lg={3}><h6 className='text-center'>{props.referrer?.firstName} {props.referrer?.lastName}</h6></Col>
                    <Col lg={4}><h6 className='text-center'>{props.referee?.email}</h6></Col>
                </Row>
            </button>
            <Modal size="xl" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><h2>Referral #{props.id}</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row style={{justifyContent: "center", alignItems: "center"}}>
                    <Col style={{padding: "0em 2em"}}>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <h4 style={{textAlign: "left"}}>Referee Details</h4>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Employee ID: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referee ? props.referee.id : "Not Applicable"} </h6></Col>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Full Name: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referee ? `${props.referee.firstName} ${props.referee?.lastName}` : props.refereeName} </h6></Col>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Email: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referee ? props.referee.email : props.refereeEmail} {props.referee?.email}</h6></Col>
                        </Row>
                    </Col>
                    <Col style={{padding: "0em 2em"}}>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                        <h4 style={{textAlign: "left"}}>Referrer Details</h4>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Employee ID: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referrer?.id} </h6></Col>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Full Name: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referrer?.firstName} {props.referrer?.lastName} </h6></Col>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <Col lg={3}><h6 style={{textAlign: "left"}}>Email: </h6></Col>
                            <Col><h6 style={{textAlign: "left"}}>{props.referrer?.email}</h6></Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{justifyContent: "center", alignItems: "center"}}>
                    <Col>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            <h4 className='text-center'>Resume </h4>
                        </Row>
                        <Row style={{justifyContent: "center", alignItems: "center"}}>
                            {/* <iframe src="https://www.adityavsingh.com/resume.pdf" height="400" title="Resume"></iframe> */}
                            {/* <object data={`localhost:3000/api/referral/file?id=${props.resumeId}`} type="application/pdf"> */}
                                {/* <iframe title="Resume" src={resume}></iframe> */}
                            {/* </object> */}
                            <Document file={resume} onLoadSuccess={onPDFLoadSuccess}>
                                <Page pageNumber={pageNumber}/>
                            </Document>
                            <p> Page {pageNumber}of {numPages}</p>
                        </Row>
                    </Col>
                </Row>
            </Modal.Body>
          </Modal>
          </React.Fragment>
        );
}

export default ReferralItem;