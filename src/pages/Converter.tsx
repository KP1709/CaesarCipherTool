/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { useEncodedCipher } from "../hooks/useEncodedCipher";
import AlphabetShiftDisplay from "../components/alphabetShift"
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useAlphabetStep from "../hooks/useAlphabetStep";

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
    resize: vertical;
`;

const ButtonStyles = css`
    width: 100%;
    height: 3em;
    border-radius: 50px;
    font-family:'Courier New', Courier, monospace;
    border: 2px solid black;
    font-weight: 600;
    letter-spacing: 2px;
    cusor: pointer;

    &:hover {
    background-color: rgb(240,128,128);
  }

    &:focus {
    outline: 4px solid rgb(233,150,122);
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
    visibility: ${(props) => props.isDrawOpen ? 'visible' : 'hidden'};
    left: 0;
    padding: 10px;
    width: 100%;
    background-color: rgb(228, 177, 177);
    transition: bottom 1.5s ease-out, visibility 1.5s ease-out;
    height: fit-content;
`;

const mainLabelStyling = css`
    font-size:clamp(1rem, 5vw, 1.25rem);
    font-weight: bold;
`;

const Label = styled.label`
    ${mainLabelStyling}
`;

const Heading = styled.h3`
    ${mainLabelStyling}
`;

const originalAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Converter() {
    const [plainTextInput, setPlainTextInput] = useState('')
    const [isDrawOpen, setIsDrawOpen] = useState(false)
    const { step, increment_step, decrement_step } = useAlphabetStep()
    const { cipherString, setUserEntry, setUserStep, mappedAlphabet, userStep } = useEncodedCipher()

    const handleSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault()
        setUserEntry(plainTextInput)
    }

    const handleShiftSubmit = (e: { preventDefault: () => void }): void => {
        e.preventDefault()
        setUserStep(step)
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
                        aria-multiline={true}
                        data-test="plain-text__input"
                    />

                    <Label htmlFor="encrypted-text__display">Ciphered text:</Label>
                    <TextArea
                        aria-disabled={"true"}
                        value={cipherString}
                        id="encrypted-text__display"
                        name="encrypted-text__display"
                        onChange={() => { }}
                        contentEditable={false}
                        aria-multiline={true}
                        aria-readonly={true}
                        spellCheck={false}
                        data-test="encrypted-text__display"

                    />
                    <ButtonInput type="submit" value="Encrypt" data-test="encrypt-btn" />
                </form>
            </Item>

            <Item>
                <Button onClick={toggleDraw} data-test='alphabet-shift__btn'>
                    View alphabet mapping
                </Button>
            </Item>

            <DrawContainer isDrawOpen={isDrawOpen} data-test="alphabet-shift__container">
                <form onSubmit={handleShiftSubmit} css={css`margin-bottom: 1em;`}>
                    <div css={css`display: flex; flex-direction: column; align-items: center; margin: 0; padding: 0;`}>
                        <Heading>Alphabet step:</Heading>
                        <div css={css`display: flex; align-items: center; justify-content: center;`}>
                            <ButtonStep
                                aria-label="decrement step count"
                                aria-live="assertive"
                                onClick={decrement_step}
                                data-test="decrement-step__btn"

                            >
                                -
                            </ButtonStep>
                            <p id="step-value" aria-live="polite" role="status" css={css`font-size: 1.2rem; padding: 10px;`}>
                                <span data-test="step-value">{step}</span>
                            </p>
                            <ButtonStep
                                aria-label="increment step count"
                                aria-live="assertive"
                                onClick={increment_step}
                                data-test="increment-step__btn"
                            >
                                +
                            </ButtonStep>
                        </div>
                    </div>
                </form>

                <AlphabetShiftDisplay originalAlphabet={originalAlphabet} mappedAlphabet={mappedAlphabet} step={userStep} />

                <Button onClick={toggleDraw} data-test="close-alphabet-shift__btn">
                    Close
                </Button>
            </DrawContainer>

        </Container>

    )
}

export default Converter