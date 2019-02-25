import React, { FC, useState } from 'react';
import { ChessBoard, PieceData } from './components/ChessBoard';
import styled from 'styled-components';
import { A } from './components/styled/A';
import { PieceTypes } from './types';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  text-align: center;
  color: white;

  height: 100vh;
`;

const StyledAppMain = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  background-color: #282c34;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
`;

const StyledFooter = styled.footer`
  background-color: #5d5d81;
  padding: 8px 0;
`;

const App: FC = props => {
  const [piecesData] = useState<PieceData[]>([
    { position: { x: 2, y: 1 }, type: PieceTypes.K, team: 'black' },
    { position: { x: 4, y: 8 }, type: PieceTypes.Q, team: 'white' }
  ]);
  return (
    <StyledApp>
      <StyledAppMain>
        <p>Chess?</p>
        <ChessBoard pieces={piecesData} />
        {/* <ChessPiece team='white' type={PieceTypes.R} /> */}
      </StyledAppMain>
      <StyledFooter>
        Icons made by{' '}
        <A href='http://www.freepik.com/' title='Freepik'>
          Freepik
        </A>{' '}
        from{' '}
        <A href='https://www.flaticon.com/' title='Flaticon'>
          www.flaticon.com
        </A>{' '}
        is licensed by{' '}
        <A
          href='http://creativecommons.org/licenses/by/3.0/'
          title='Creative Commons BY 3.0'
          target='_blank'
        >
          CC 3.0 BY
        </A>
      </StyledFooter>
    </StyledApp>
  );
};

export default App;
