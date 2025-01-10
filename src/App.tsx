/** @jsxImportSource @emotion/react */
import Converter from './pages/Converter'
import { css } from '@emotion/react';

function App() {
  return (
    <main css={css`
      display: flex;
      justify-content: center;
    `}
    >
      <Converter />
    </main>
  )
}

export default App