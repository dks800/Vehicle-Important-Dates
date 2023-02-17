import React, { useEffect } from "react";
import Vehicle from "./Vehicle";
import { Accordion } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setVehicleList } from "../redux/actions/vehicleActions";
import database from "../config/firebase";
import { ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import Spinner from "../utils/Spinner/Spinner";

export default function VehicleList() {
  let vehicleList = useSelector((state) => state.allVehicles.vehicles);
  const formatVehicleListData = (data) => {
    if (!data) return [];
    const objKeys = Object.keys(data);
    if (objKeys < 1) return [];
    let formattedData = [];
    objKeys.map((key) => formattedData.push(data[key]));
    return formattedData;
  };
  vehicleList = formatVehicleListData(vehicleList);
  const dispatch = useDispatch();
  useEffect(() => {
    const vehicleRef = ref(database, "vehicles");
    onValue(vehicleRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setVehicleList(data));
    });
  }, []);
  return (
    <div>
      {vehicleList && vehicleList.length < 1 && <Spinner />}
      {vehicleList && vehicleList.length > 0 && (
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Important Dates</Accordion.Header>
            <Accordion.Body>
              {vehicleList.map((vehicle, index) => {
                return (
                  <Vehicle
                    key={index}
                    data={vehicle}
                    date={vehicle.insurance_exp_date}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
}
