import styled from '@emotion/styled';

const GridUnorderedList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4em, 1fr));
    justify-items: center;
    column-gap: 1.5em;
    row-gap: 1em;
    list-style: none;
    padding: 0;
    height: 40vh;
    overflow-y: auto;
    font-size:clamp(0.8rem, 10vw, 1.2rem)
`;

type AlphabetShiftType = {
    mappedAlphabet: string[]
    originalAlphabet: string[]
    step: number
}

function AlphabetShiftDisplay({ step, mappedAlphabet, originalAlphabet }: AlphabetShiftType) {
    return (
        <div>
            <GridUnorderedList>
                {originalAlphabet.map((letter, index) =>
                    <li key={letter}>{letter} &#8658; {step === 0 ? originalAlphabet[index] : mappedAlphabet[index]}</li>
                )}
            </GridUnorderedList>
        </div>
    )
}

export default AlphabetShiftDisplay