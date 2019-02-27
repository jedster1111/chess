import React, { FC } from 'react';
import { A } from './styled/A';

export const Credit: FC = props => (
  <span>
    Icons made by{' '}
    <A href='http://www.freepik.com/' title='Freepik'>
      Freepik
    </A>{' '}
    from{' '}
    <A href='https://www.flaticon.com/' title='Flaticon'>
      www.flaticon.com
    </A>{' '}
    is licensed by{' '}
    <A href='http://creativecommons.org/licenses/by/3.0/' title='Creative Commons BY 3.0' target='_blank'>
      CC 3.0 BY
    </A>
  </span>
);
