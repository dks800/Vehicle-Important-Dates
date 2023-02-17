import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import database from "../config/firebase";
import { ref, remove } from "firebase/database";
import defaultImage from "./../img/default.jpeg";
import ModalBox from "./ModalBox";

export default function Vehicle(props) {
  const vehicleData = props.data;
  vehicleData.date = props.date;
  const [displayModal, setDisplayModal] = useState(false);

  const handleRemoveVehicle = (vehicle) => {
    if (window.confirm("Are you sure to delete this vehicle?")) {
      remove(ref(database, `vehicles/${vehicle}`));
      console.log("deleted");
    }
  };
  const formatDate = (date) => {
    const vehicleDate = new Date(date);
    if (isNaN(Date.parse(vehicleDate))) {
      return "---";
    } else {
      return vehicleDate.toDateString();
    }
  };

  const checkExpiryDate = (insExpDt, pucExpDt) => {
    let insTime = new Date(insExpDt).getTime();
    let pucTime = new Date(pucExpDt).getTime();
    let todayTime = new Date().getTime();
    let insLeftDays = (insTime - todayTime) / (1000 * 3600 * 24);
    let pucLeftDays = (pucTime - todayTime) / (1000 * 3600 * 24);
    return insLeftDays <= 30 || pucLeftDays <= 30 ? "danger-item" : "";
  };

  const updateVehicle = () => {
    setDisplayModal(true);
  };

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <div>
      <Card
        style={{ width: "18rem" }}
        className={checkExpiryDate(
          vehicleData.insurance_exp_date,
          vehicleData.puc_exp_date
        )}
      >
        <Card.Img
          variant="top"
          className="vehicle-image"
          src={vehicleData.vehicle_image || defaultImage}
        />
        <Card.Body>
          <Card.Title>{`${vehicleData.vehicle_model}`}</Card.Title>
          <Card.Text>
            <div className="vehicle-dates">
              <div>
                <span>Insurance:&nbsp;</span>
                <span>{formatDate(vehicleData.insurance_exp_date)}</span>
              </div>
              <div>
                <span>PUC:&nbsp;</span>
                <span>{formatDate(vehicleData.puc_exp_date)}</span>
              </div>
            </div>
          </Card.Text>
          <Button variant="primary" onClick={() => updateVehicle()}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleRemoveVehicle(vehicleData.registration_number)}
          >
            Remove
          </Button>
        </Card.Body>
      </Card>
      <ModalBox
        close={closeModal}
        display={displayModal}
        title="Update Vehicle"
        data={vehicleData}
      />
    </div>
  );
}
