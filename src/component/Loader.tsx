"use client";
import React from "react";
import styled from "styled-components";
import { Circles } from "react-loader-spinner";

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 100% of the viewport height */
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <Circles
        height="80"
        width="80"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderWrapper>
  );
};

export default Loader;
