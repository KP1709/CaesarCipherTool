/** @jsxImportSource @emotion/react */
import { useReducer, useState } from "react";
import { useEncodedCipher } from "../hooks/useEncodedCipher";
import AlphabetShiftDisplay from "../components/alphabetShift"
import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface DrawContainerProps {
    isDrawOpen: boolean;
}

const Container = styled.div`
    display: grid;
    position: relative;
    padding: 10px;
    min-height: 100vh;
    width: clamp(300px, 100%, 400px);
    background-color:rgb(179, 90, 90);
    margin: 0;
    overflow-y: hidden;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    border-radius: 10px;
    border: 2px solid black;
    margin-bottom: 10px;
    padding: 10px;
`;

const ButtonStyles = css`
    width: 100%;
    height: 3em;
    border-radius: 50px;
    font-family:'Courier New', Courier, monospace;
    border: 2px solid black;
    font-weight: 600;
    letter-spacing: 2px;

    &:hover {
    background-color: lightcoral;
  }
`;

const Button = styled.button`
    ${ButtonStyles}
`;

const ButtonInput = styled.input`
    ${ButtonStyles}
    margin-top: 2px;
`;

const ButtonStep = styled.button`
    ${ButtonStyles}
    height: 2.5em;
    width: 2.5em;
    font-size: 1.2rem;
`;

const DrawContainer = styled.div<DrawContainerProps>`
    position: absolute;
    bottom: ${(props) => props.isDrawOpen ? '0' : '-900px'};
    left: 0;
    padding: 10px;
    width: 100%;
    background-color: rgb(228, 177, 177);
    transition: bottom 1.5s ease-out;
`;

const Label = styled.label`
    font-size:clamp(1rem, 5vw, 1.25rem);
    font-weight: 600;
`;

type State = {
    step: number;
};

type Action =
    | { type: 'increment_step'; }
    | { type: 'decrement_step'; }

// @ts-ignore
function adjustStepReducer(state: State, action: Action): State {
    if (action.type === "increment_step") {
        if (state.step === 25) return { step: state.step }
        else
            return { step: state.step + 1 }
    }
    else if (action.type === "decrement_step") {
        if (state.step === 0) return { step: state.step }
        else
            return { step: state.step - 1 }
    }
}

const originalAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Converter() {
    const [plainTextInput, setPlainTextInput] = useState('')
    // @ts-ignore
    const [state, dispatch] = useReducer(adjustStepReducer, { step: 0 });
    const [isDrawOpen, setIsDrawOpen] = useState(false)
    const { cipherString, setUserEntry, setUserStep, mappedAlphabet, userStep } = useEncodedCipher()

    const handleSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault()
        setUserEntry(plainTextInput)
    }

    const handleShiftSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault()
        setUserStep(state!.step)
    }

    const toggleDraw = () => setIsDrawOpen(!isDrawOpen)

    return (
        <Container>
            <Item>
                <h1 css={css` text-align: center; font-size:clamp(1rem, 10vw, 1.75rem)`}>Caesar Cipher Encryption</h1>
            </Item>

            <Item>
                <form onSubmit={handleSubmit}
                    css={css`
                margin-bottom: 1em;`}>
                    <Label htmlFor='plain-text__input'> Plain text:</Label>
                    <TextArea
                        onChange={(e) => setPlainTextInput(e.target.value)}
                        id="plain-text__input"
                        name="plain-text__input"
                        value={plainTextInput}
                    />


                    <Label htmlFor="encrypted-text__display">Ciphered text:</Label>
                    <TextArea
                        aria-disabled={"true"}
                        value={cipherString}
                        id="encrypted-text__display"
                        name="encrypted-text__display"
                        onChange={() => { }}
                        contentEditable={false}
                    />
                    <ButtonInput type="submit" value="Encrypt" />
                </form>
            </Item>

            <Item>
                <Button onClick={toggleDraw}>
                    View alphabet mapping
                </Button>
            </Item>

            <DrawContainer isDrawOpen={isDrawOpen}>
                <form onSubmit={handleShiftSubmit} css={css`margin-bottom: 1em;`}>
                    <div css={css`display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0;`}>
                        <Label>Alphabet step:</Label>
                        <div css={css`display: flex; align-items: center; justify-content: center;`}>
                            <ButtonStep onClick={() => dispatch({ type: 'decrement_step' })}>-</ButtonStep>
                            <p css={css`font-size: 1.2rem; padding: 10px;`}>{state!.step}</p>
                            <ButtonStep onClick={() => dispatch({ type: 'increment_step' })}>+</ButtonStep>
                        </div>
                    </div>
                </form>

                <AlphabetShiftDisplay originalAlphabet={originalAlphabet} mappedAlphabet={mappedAlphabet} step={userStep} />

                <Button onClick={toggleDraw}>
                    Close
                </Button>
            </DrawContainer>

        </Container>

    )
}

export default Converter