import { Global } from '@mantine/core';
import regular from './fonts/lato/Lato-Bold.ttf';


export function CustomFonts() {
  return (
    <Global
      styles={[
        {
          '@font-face': {
            fontFamily: 'Lato',
            src: `url('${regular}') format("woff2")`,
            fontWeight: 900,
            fontStyle: 'normal',
          },
        },
        // {
        //   '@font-face': {
        //     fontFamily: 'Lato',
        //     src: `url('${bold}') format("woff2")`,
        //     fontWeight: 900,
        //     fontStyle: 'normal',
        //   },
        // },
      ]}
    />
  );
}