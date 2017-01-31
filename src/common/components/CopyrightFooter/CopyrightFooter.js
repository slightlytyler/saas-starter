import React from 'react';
import { Box } from 'react-layout-components';
import { COPYRIGHT_START as startYear } from 'src/config';

const currentYear = new Date().getFullYear();
const copyRightYears = currentYear === startYear ? currentYear : `${startYear}, ${currentYear}`;

const CopyrightFooter = () => (
  <Box center className="CopyrightFooter">
    <span className="CopyrightFooter__text">
      ©IBM Corporation {copyRightYears}. View our <span className="CopyrightFooter__link">Data Policy</span> and <span className="CopyrightFooter__link">Terms</span>.
    </span>
  </Box>
);

export default CopyrightFooter;
