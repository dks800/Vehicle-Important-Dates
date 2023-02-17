import { useState } from "react";
import "./App.css";
import VehicleList from "./components/VehicleList";
import NavigationBar from "./components/NavigationBar";
import FooterButtons from "./components/FooterButtons";
import ModalBox from "./components/ModalBox";

function App() {
  const [displayModal, setDisplayModal] = useState(false);

  const showModal = () => {
    setDisplayModal(true);
  };
  const closeModal = () => {
    setDisplayModal(false);
  };
  return (
    <>
      <NavigationBar />
      <div className="App">
        <div className="container">
          <VehicleList />
          <ModalBox
            close={closeModal}
            display={displayModal}
            title="Add a Vehicle"
          />
          <FooterButtons showModal={showModal} />
        </div>
      </div>
    </>
  );
}

export default App;
