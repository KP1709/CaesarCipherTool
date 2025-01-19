import { useReducer } from "react";

type State = {
    step: number;
};

const initialStepState: State = {
    step: 0
}

type Action =
    | { type: 'increment_step', payload: 1; }
    | { type: 'decrement_step', payload: 1; }

function adjustStepReducer(state: State, action: Action): State {
    const { type, payload } = action;

    if (type === "increment_step") {
        if (state.step === 25) return { ...state, step: state.step }
        else
            return { step: state.step + payload }
    }
    else if (type === "decrement_step") {
        if (state.step === 0) return { ...state, step: state.step }
        else
            return { step: state.step - payload }
    }
    else {
        return state;
    }
}

function useAlphabetStep() {
    const [state, dispatch] = useReducer(adjustStepReducer, initialStepState);
    return {
        increment_step: () => dispatch({ type: 'increment_step', payload: 1 }),
        decrement_step: () => dispatch({ type: 'decrement_step', payload: 1 }),
        step: state.step,
    }
}

export default useAlphabetStep