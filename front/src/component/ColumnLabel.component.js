import React from 'react'
import { Col, Row } from "react-bootstrap";

const ColumnLabel = ({ labelName, listPR }) => {
  return (
    <>
      <Col className="column-label">
        {/* Label PR */}
        <Row>
          <div className="label-name">
            {labelName}
          </div>
        </Row>
        <Row>
          <div className="container-pr">
            {listPR.map((pr, i) => {
              return <a href={pr.html_url} target="_blank">
                <Row key={i}>
                  <Col md="2">
                    <img
                      id="merge-logo_"
                      src={process.env.PUBLIC_URL + "logo-merge.png"}
                      alt="merge-logo"
                      width={40}
                      height={40}
                    />
                  </Col>
                  <Col style={{ wordBreak: "break-all" }} className="description-pr">
                    {pr.title}
                  </Col>
                </Row>
              </a>
            })}
          </div>
        </Row>
      </Col>
    </>
  )
};

export default ColumnLabel;
