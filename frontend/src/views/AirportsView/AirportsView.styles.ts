import {css} from '@emotion/css';

export const viewDescription = css({
    marginBottom: '10px',
});

export const airportsList = css({
    paddingLeft: '0px',
    listStylePosition: 'inside',
});

export const airportLink = css({
    textDecorationLine: 'none',
    ':hover': {
        textDecorationLine: 'underline',
    },
});
