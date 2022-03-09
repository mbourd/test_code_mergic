import { Col, Row } from "react-bootstrap";

const NextPR = ({ nextPR }) => {
  return <>
    <Col md="3">
      Next PR to review :
    </Col>
    <Col style={{ border: "6px solid blue" }}>
      <Row>
        <Col md="2">
          <img
            id="spotify-logo"
            src={process.env.PUBLIC_URL + "logo-merge.png"}
            alt="merge-logo"
            width={40}
            height={40}
          />
        </Col>
        <Col>
          <span style={{ padding: "8px 0" }}>{nextPR.title}<br />{ new Date(nextPR.created_at).toDateString() }, by {nextPR.user.login}</span>
        </Col>
      </Row>
    </Col>
  </>
}

export default NextPR;
