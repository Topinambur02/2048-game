import React from 'react';
import { render } from '@testing-library/react';
import VolumeSvg from '@/assets/svgs/VolumeSvg';

describe('VolumeSvg', () => {
    test('renders without crashing', () => {
        render(<VolumeSvg />);
    });
});