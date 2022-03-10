import { Container, Col, Row, Button, Form, Card, ListGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { service } from "..";
import { useState } from "react";

const FormRepoGithub = ({ setListPR, setNextPR, setIsComputingAllPR }) => {
  const [isDisabledUrlInput, setIsDisabledUrlInput] = useState(false);
  const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(false);

  const getPullRequest = (urlRepoGithub) => {
    let owner = "";
    let repo = "";
    let splitURL = urlRepoGithub.split("/");

    owner = splitURL[splitURL.length - 2];
    repo = splitURL[splitURL.length - 1];

    service.github.getAllPullRequest(owner, repo)
      .then(r => {
        setListPR(r.data);
        getNextPRToReview(r.data);
      });
  }

  const getNextPRToReview = (listPR) => {
    service.app.getPullRequestToReview(listPR)
      .then(r => {
        // console.log(r.data)
        setIsComputingAllPR(false);
        setNextPR(r.data);
        setIsDisabledUrlInput(false);
        setIsDisabledSubmitBtn(false);
      });
  }

  return <>
    <Formik
      initialValues={{
        urlRepo: ""
      }}
      validationSchema={() => Yup.object().shape({
        urlRepo: Yup.string()
          .matches(/^(https:\/\/github\.com\/)[a-zA-Z0-9]+\/[a-zA-Z0-9]+$/, "Ce n'est pas un lien URL Github valide")
          .required("URL doit être renseigné")
      })}
      onSubmit={async (values) => {
        setListPR([]);
        setIsDisabledUrlInput(true);
        setIsDisabledSubmitBtn(true);
        setIsComputingAllPR(true);
        getPullRequest(values.urlRepo);
      }}
    >
      {({ errors, touched, values, handleSubmit, handleChange }) => (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Row>
                  <Col>
                    <Form.Label>Repository URL</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      disabled={isDisabledUrlInput}
                      name="urlRepo"
                      type="text"
                      placeholder="https://github.com/python/cpython"
                      onChange={handleChange("urlRepo")}
                      value={values.urlRepo}
                      isInvalid={touched.urlRepo && !!errors.urlRepo}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Button
                type="submit"
                className="outline-info"
                onClick={handleSubmit}
                disabled={isDisabledSubmitBtn}
              >
                Valider
              </Button>
            </Col>
          </Row>
          <Row>
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.urlRepo}
            </Form.Control.Feedback>
          </Row>
        </Form>
      )}
    </Formik>
  </>
}

export default FormRepoGithub;
