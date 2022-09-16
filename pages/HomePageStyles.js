import styled from "styled-components";

export const TitleDiv = styled.div`
    position: relative;
    height: 250px;
    width: 700px;
    margin: auto auto 100px auto;
    color: black;
    text-align: center;
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        // z-index: -1;
        // margin: -5%;
        box-shadow: inset 0 0 0 2px;
        animation: clipMe 8s linear infinite;
    }
    &:before {
        animation-delay: -4s;
    }
    @keyframes clipMe {
        0%, 100% {
          clip-path: inset(0 99% 0 0);
        }
        25% {
          clip-path: inset(99% 0 0 0);
        }
        50% {
          clip-path: inset(0 0 0 99%);
        }
        75% {
          clip-path: inset(0 0 99% 0);
        }
    }
    @media (max-width: 700px) {
        height: 250px;
        width: 400px;
    }
    @media (max-width: 430px) {
        height: 250px;
        width: 300px;
    }
    @media (max-width: 310px) {
        height: 250px;
        width: 250px;
    }
`;

export const TitleHeader = styled.h1`
    font-size: 120px;
    margin: 0px;
    padding: 0px;
    font-weight: 400;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 4px 4px #CAC8C8;
    @media (max-width: 700px) {
        font-size: 70px;
    }
    @media (max-width: 430px) {
        font-size: 50px;
        text-shadow: 3px 3px #CAC8C8;
    }
    @media (max-width: 310px) {
        font-size: 40px;
        text-shadow: 2px 2px #CAC8C8;
    }
`;