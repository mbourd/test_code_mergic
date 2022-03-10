import logo from './logo.svg';
import './App.css';

import { Container, Col, Row, Button, Form, Card, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import ColumnLabel from './component/ColumnLabel.component';
import FormRepoGithub from './component/FormRepoGitHub.component';
import NextPR from './component/NextPR.component';

function App() {
  const [nextPR, setNextPR] = useState({});
  const [listLabels, setListLabels] = useState(["urgent", "help-needed", "bugfix", "CLA signed"]);
  const [listPR, setListPR] = useState([]);
  const [listPRArranged, setListPRArranged] = useState([]);
  const [isComputingAllPR, setIsComputingAllPR] = useState(false);

  useEffect(() => {
    let arranged = {};

    for (const pr of listPR) {
      for (const prLabel of pr.labels) {
        if (!arranged.hasOwnProperty(prLabel.name)) {
          arranged[prLabel.name] = [pr];
        } else {
          arranged[prLabel.name].push(pr);
        }
      }
    }

    // setListLabels(Object.keys(arranged));
    setListPRArranged(arranged);

  }, [listPR]);

  return (
    <div className="App">
      <Container>
        {/* Input Repository URL */}
        <Row>
          <Col>
            <FormRepoGithub
              setNextPR={setNextPR}
              setListPR={setListPR}
              setIsComputingAllPR={setIsComputingAllPR}
            />
          </Col>
        </Row>

        {/* Result next PR to review */}
        <Row>
          <NextPR
            nextPR={nextPR}
            isComputingAllPR={isComputingAllPR}
          />
        </Row>

        <Row>
          <Col>
            <h3>PR by label</h3>
            <Row>
              {listLabels.map((label, i) => {
                return <>
                  <ColumnLabel
                    key={i}
                    labelName={label}
                    listPR={listPRArranged.hasOwnProperty(label) ? listPRArranged[label] : []}
                  />
                </>
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
