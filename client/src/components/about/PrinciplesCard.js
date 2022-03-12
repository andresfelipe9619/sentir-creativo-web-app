import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'visible',
    borderRadius: '.75rem'
  },
  chips: {
    borderRadius: 0,
    fontSize: '11px',
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  title: {
    fontSize: '36px',
    marginTop: theme.spacing(2)
  }
}))

export default function PrinciplesCard({ title, details, avatar }) {
  const theme = useTheme()
  const classes = useStyles()
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const size = isMedium ? '5rem' : '13rem';
  const imgPosition = isMedium ? '1rem 0 auto 1rem' : '-1rem 0 -1rem -6rem'

  return (
    <Card className={classes.root}>
      <CardContent component={Box} display='flex' alignItems="center" style={{ padding: 0 }}>
        <Avatar alt="Icono" src={avatar}
          style={{ width: size, height: size, margin: imgPosition, borderRadius: 0 }} />

        <Box px={3}>
          <Typography variant='h1' className={classes.title}>
            {title}&nbsp;
            <Chip label='PRO' size='small' className={classes.chips} />
          </Typography>

          <Typography paragraph>
            {details}
          </Typography>
        </Box>
      </CardContent>
  </Card>
  )
}
