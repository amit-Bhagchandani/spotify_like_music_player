import React from "react";

const Spinner = () => {
  return (
    <>
      <style>
        {`@keyframes spinner {
                to {
                  transform: rotate(360deg);
                }
              }
              
              .loading {
                width: 3rem;
                height: 3rem;
                margin: auto;
                border: 5px solid white;
                border-radius: 50%;
                border-top-color: grey;
                animation: spinner 0.6s linear infinite;
              }`}
      </style>
      <div className="loading"></div>
    </>
  );
};

export default Spinner;
