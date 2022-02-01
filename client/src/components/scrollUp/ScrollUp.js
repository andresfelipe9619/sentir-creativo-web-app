import { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import { makeStyles } from '@material-ui/core/styles'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}))

export default function ScrollUp() {
    const classes = useStyles();

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const onScroll = () => {
            const top = (document.body.scrollTop ||
                document.documentElement.scrollTop
            )

            setIsVisible(top >= 100);
        };

        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        };
    }, [])

    const onScroll2Up = () => {
        window.scrollTo(0, 0);
    };

    return (
        <Fade in={isVisible}>
            <Fab aria-label="Scroll Up" className={classes.root} color="primary"
                onClick={onScroll2Up}>
                <KeyboardArrowUpIcon />
            </Fab>
        </Fade>
    );
}
