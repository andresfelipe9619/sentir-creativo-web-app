import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "72px",
    lineHeight: 1,
    fontWeight: 900,
    fontStyle: 'italic',
    [theme.breakpoints.down('md')]: {
      fontSize: '64px'
    }
  },
  arrowDownIcon: {
    width: "2.5rem",
    height: "2.5rem",
    transform: "rotate(180deg)",
    transition: ".3s ease-out",
  },
  rotate: {
    transform: "rotate(0)",
  },
}));

export default function Connections({
  connections,
  title,
  subtitle,
  color,
  children,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Box bgcolor={color} color="white" p={3}>
        <Typography variant="h1" align="center" className={classes.title}>
          {title}
        </Typography>
      </Box>

      <Box bgcolor='white' p={2} my={6} style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px', width: '90%' }}
        display='flex' justifyContent='space-around' alignItems='center'>
        <Typography variant='h1' align='center' style={{ color }}>
          {subtitle}
        </Typography>

        <KeyboardArrowDownIcon
          className={clsx(classes.arrowDownIcon, expanded && classes.rotate)}
          style={{ fill: color }}
          onClick={() => setExpanded(!expanded)}
        />
      </Box>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {connections.map(x => <ConnectionItem key={x.match} hidden={!expanded} {...x} />)}
        {children}
      </Collapse>
    </>
  );
}

function ConnectionItem({ color, icon: Icon, details, match, hidden }) {
  details = details.split(/\n/)
    .map((text, index, array) => {
      const props = {
        component: 'span',
        display: (array[index + 1] === match || array[index - 1] === match) ? 'inline' : 'block',
        style: { lineHeight: 1, fontWeight: 400 }
      };

      if (text === match) {
        props.display = 'inline'
        props.style = { fontWeight: 500, lineHeight: 1 }
        props.component = 'strong'
      }

      return (
        <Typography key={text} {...props}>
          {text}
        </Typography>
      );
    });

  return (
    <Grid container spacing={2}>
      <Grid xs={1} item></Grid>
      <Grid container item xs={2} justifyContent="center">
        <Icon style={{ width: "5rem", height: "5rem", fill: color }} />
      </Grid>

      <Grid item xs={9}>
        <Box mb={6} ml={2}>
          <Typography variant='h6' paragraph gutterBottom style={{ opacity: hidden ? 0 : 1, transition: 'opacity 1s ease-out' }}>
            {details}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
