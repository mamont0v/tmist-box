import styled from 'styled-components';
// import Logo from '../../images/Circle-Loading.svg';

const SpinnerSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        color="#3f51b5"
    >
        <defs>
            <linearGradient id="spinner-secondHalf">
                <stop offset="0%" stopOpacity="0" stopColor="currentColor" />
                <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id="spinner-firstHalf">
                <stop offset="0%" stopOpacity="1" stopColor="currentColor" />
                <stop offset="100%" stopOpacity="0.5" stopColor="currentColor" />
            </linearGradient>
        </defs>

        <g strokeWidth="8">
            <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
            <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />

            <path
                stroke="currentColor"
                strokeLinecap="round"
                d="M 4 100 A 96 96 0 0 1 4 98"
            />
        </g>

        <animateTransform
            from="0 0 0"
            to="360 0 0"
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1300ms"
        />
    </svg>
);

const LoaderContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 1); /* темный фон */
`;

export const Loader = () => {
    return (
        <LoaderContainer>
            <SpinnerSVG />
            {/* <LoaderImage src={Logo} alt="Loading..." /> */}
        </LoaderContainer>
    );
}