import React from "react";
import { Button } from "react-bootstrap";

export default function FooterButtons(props) {
  const displayModal = () => {
    props.showModal();
  };
  return (
    <>
      <Button
        variant="secondary"
        size="lg"
        className="btn-fixed-bottom reload-page"
        onClick={() => window.location.reload()}
      >
        ↻
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="btn-fixed-bottom"
        onClick={() => displayModal()}
      >
        +
      </Button>
    </>
  );
}
