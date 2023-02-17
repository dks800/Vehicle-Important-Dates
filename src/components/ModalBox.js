import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { dbConstants } from "../constants/dbConstants";
import database from "../config/firebase";
import { ref, set } from "firebase/database";
import { getBase64 } from "../utils/commonFunctions";
import Spinner from "../utils/Spinner/Spinner";
import defaultImage from "./../img/default.jpeg";

export default function ModalBox(props) {
  const clearStateValue = {
    [dbConstants.REGISTRATION_NUMBER]: "",
    [dbConstants.VEHICLE_MODEL]: "",
    [dbConstants.INSURANCE_EXP_DATE]: "",
    [dbConstants.PUC_EXP_DATE]: "",
    [dbConstants.VEHICLE_IMAGE]: "",
  };
  const [vehicleData, setVehicleData] = useState(clearStateValue);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (props.data && Object.keys(props.data).length > 0) {
      setVehicleData({
        [dbConstants.REGISTRATION_NUMBER]: props.data.registration_number,
        [dbConstants.VEHICLE_MODEL]: props.data.vehicle_model,
        [dbConstants.INSURANCE_EXP_DATE]: props.data.insurance_exp_date,
        [dbConstants.PUC_EXP_DATE]: props.data.puc_exp_date,
        [dbConstants.VEHICLE_IMAGE]: props.data.vehicle_image,
      });
    }
  }, [props.data]);

  const saveVehicleData = () => {
    setShowSpinner(true);
    set(
      ref(database, `vehicles/${vehicleData.registration_number}`),
      vehicleData
    )
      .then(() => {
        closeModalBox();
        setShowSpinner(false);
      })
      .catch((err) => {
        console.error(err);
        setShowSpinner(false);
      });
  };

  const updateVehicleImage = (e, result) => {
    let attribute = e.target.dataset.type;
    let newVehicleData = {
      ...vehicleData,
      [attribute]: result,
    };
    setVehicleData(newVehicleData);
  };
  const updateVehicleData = async (e) => {
    let attribute = e.currentTarget.dataset.type;
    let val = e.currentTarget.value;
    if (attribute === dbConstants.REGISTRATION_NUMBER) {
      val = val.length === 2 ? val + "-" : val;
      val = val.length === 5 ? val + "-" : val;
      val = val.length === 8 ? val + "-" : val;
    }
    if (attribute === dbConstants.VEHICLE_IMAGE) {
      let file = e.currentTarget.files[0];
      return await getBase64(file, updateVehicleImage, e);
    }
    val = val.toUpperCase();
    let newVehicleData = {
      ...vehicleData,
      [attribute]: val,
    };
    setVehicleData(newVehicleData);
  };

  const closeModalBox = () => {
    setVehicleData(clearStateValue);
    props.close();
  };

  return (
    <Modal show={props.display} onHide={() => closeModalBox()} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSpinner && <Spinner />}
        <Form>
          <div className="form-div">
            <Form.Group className="mb-3" controlId="formRegistrationNumber">
              <Form.Label>Vehicle Registration Number</Form.Label>
              <Form.Control
                data-type={dbConstants.REGISTRATION_NUMBER}
                value={vehicleData.registration_number}
                type="text"
                placeholder="Enter registration number"
                onChange={(e) => updateVehicleData(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formVehicleModel">
              <Form.Label>Vehicle Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Vehicle Model"
                value={vehicleData.vehicle_model}
                data-type={dbConstants.VEHICLE_MODEL}
                onChange={(e) => updateVehicleData(e)}
              />
            </Form.Group>
          </div>
          <div className="form-div">
            <Form.Group className="mb-3" controlId="formInsuranceExpiry">
              <Form.Label>Insurance Expiry</Form.Label>
              <Form.Control
                type="date"
                placeholder="dd/mm/yyyy"
                data-type={dbConstants.INSURANCE_EXP_DATE}
                value={vehicleData.insurance_exp_date}
                onChange={(e) => updateVehicleData(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPUCExpiry">
              <Form.Label>PUC Expiry</Form.Label>
              <Form.Control
                type="date"
                placeholder="dd/mm/yyyy"
                value={vehicleData.puc_exp_date}
                data-type={dbConstants.PUC_EXP_DATE}
                onChange={(e) => updateVehicleData(e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formVehicleImage">
              <Form.Label>Vehicle Image</Form.Label>
              <div className="vehicle-image-section">
                <img
                  src={vehicleData.vehicle_image || defaultImage}
                  alt="Vehicle"
                  height="100"
                  width="100"
                />
                <Form.Control
                  type="file"
                  accept="image/*"
                  placeholder="Upload Image"
                  data-type={dbConstants.VEHICLE_IMAGE}
                  onChange={(e) => updateVehicleData(e)}
                />
              </div>
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => closeModalBox()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => saveVehicleData()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
