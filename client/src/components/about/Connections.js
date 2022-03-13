import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '72px',
    lineHeight: 1,
    [theme.breakpoints.down('md')]: {
      fontSize: '64px'
    }
  }
}))

export default function Connections({ connections, title, subtitle, color, expanded, onExpand }) {
  const classes = useStyles()

  return (
    <>
      <Box bgcolor={color} color='white' p={3}>
        <Typography variant='h1' align='center' className={classes.title}>{title}</Typography>
      </Box>

      <Box bgcolor='white' p={2} mt={4} mb={8} style={{ borderTopRightRadius: '50px', borderBottomRightRadius: '50px', width: '90%' }}
        display='flex' justifyContent='space-around' alignItems='center'>
        <Typography variant='h1' align='center' style={{ color }}>
          {subtitle}
        </Typography>

        <KeyboardArrowDownIcon style={{ width: '2.5rem', height: '2.5rem', fill: color }}
          onClick={() => onExpand(!expanded)}/>
      </Box>

      <Collapse in={expanded} timeout='auto' unmountOnExit>
        {connections.map(x => <ConnectionItem {...x} />)}
      </Collapse>
    </>
  )
}

function ConnectionItem({ color, icon: Icon, details, match }) {
  details = details.split(/\n/)
  .map((text, index, array) => {
    const props = {
      component: 'span',
      display: (array[index + 1] === match || array[index - 1] === match) ? 'inline' : 'block',
    };

    if (text === match) {
      props.display = 'inline'
      props.style = { fontWeight: 'bold' }
      props.component = 'strong'
    }

    return <Typography key={text} {...props}>{text}</Typography>;
  })

  return (
    <Grid container spacing={2}>
    <Grid xs={1}></Grid>
    <Grid container xs={2} justifyContent='center'>
      <Icon style={{ width: '5rem', height: '5rem', fill: color }}/>
    </Grid>

    <Grid xs={9}>
      <Box mb={6} ml={2}>
        <Typography variant='h6' color='textSecondary' paragraph gutterBottom>
          {details}
        </Typography>
      </Box>
    </Grid>
  </Grid>
  )
}
