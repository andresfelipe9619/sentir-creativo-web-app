import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Chip, Tooltip } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
// import { red } from '@material-ui/core/colors'
// import { orange } from '@material-ui/core/colors'
// import { green } from '@material-ui/core/colors'
// import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '10%',
    margin: 1,
    marginLeft: '5%',
    overflow: 'visible'
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    padding: 0,
    width: '100%'
  },
  floatingIcon: {
    border: [[1, 'solid', indigo[800]]],
    backgroundColor: 'white'
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50%',
    color: 'white'
  }
}))

export default function AdminCard ({
  chips,
  color,
  status,
  title,
  avatar,
  statusColor,
  superheader,
  subheader,
  subheaderChip,
  buttonActions,
  floatingHeader,
  handleViewClick,
  renderContent,
  renderHighlights
}) {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const cardColor = color[500]

  const text = (
    <Box display='flex' flexDirection='column'>
      <Typography variant='caption' gutterBottom>
        {superheader}
      </Typography>
      <Typography variant='h3'>{title}</Typography>
    </Box>
  )
  return (
    <Card className={classes.root} elevation={5}>
      {floatingHeader && (
        <FloatingHeader {...floatingHeader} classes={classes} />
      )}
      <CardHeader
        component={Box}
        title={text}
        avatar={avatar}
        subheader={
          <Box display='flex' flexDirection='column'>
            <Typography variant='caption' gutterBottom>
              {subheader}
            </Typography>
            {subheaderChip && <Chip label={subheaderChip} />}
          </Box>
        }
      />

      <CardContent classes={{ root: classes.content }}>
        {status && (
          <Box
            alignItems='center'
            color='white'
            display='flex'
            textAlign='center'
            style={{ backgroundColor: statusColor || 'LightCoral' }}
            justifyContent='center'
            p={1}
          >
            <Typography variant='h5' component='h3' align='center'>
              {status}
            </Typography>
          </Box>
        )}
        <Box
          alignItems='center'
          display='flex'
          justifyContent='center'
          px={4}
          py={1}
        >
          {renderContent && renderContent()}
        </Box>
        <Box
          alignItems='center'
          bgcolor={cardColor}
          color='black'
          display='flex'
          justifyContent='center'
          px={4}
        >
          <Typography variant='h5' component='h3' align='right'>
            Highlights
          </Typography>
          <IconButton
            color={'inherit'}
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label='show more'
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          {renderHighlights && renderHighlights()}
          {Array.isArray(chips) && (
            <Box
              alignItems='center'
              display='flex'
              justifyContent='center'
              px={4}
            >
              {(chips || [])
                .filter(n => !!n)
                .map(c => (
                  <Chip
                    key={c}
                    label={c}
                    style={{ backgroundColor: color[300] }}
                  />
                ))}
            </Box>
          )}
        </Collapse>
      </CardContent>

      <CardActions>
        <Box display='flex' justifyContent='space-between' width='100%' mt={1}>
          <Button
            size='small'
            color={'primary'}
            variant='outlined'
            onClick={handleViewClick}
          >
            VER & EDITAR
          </Button>
          {(buttonActions || []).map(b => (
            <Tooltip title={b.label} key={b.label}>
              <IconButton
                size='small'
                color={'primary'}
                variant='contained'
                onClick={b.handleClick}
              >
                {b.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </CardActions>
    </Card>
  )
}

function FloatingHeader ({ icon: Icon, label, score, classes }) {
  return (
    <Box
      display='flex'
      style={{
        height: 16,
        top: -10,
        position: 'relative',
        left: 10,
        zIndex: 1000
      }}
    >
      {Icon && (
        <Box
          display='flex'
          borderRadius='50%'
          width={30}
          height={30}
          p={2}
          mx={2}
          justifyContent='center'
          alignItems='center'
          className={classes.floatingIcon}
        >
          <Icon style={{ color: indigo[800] }} />
        </Box>
      )}
      {label && (
        <Chip
          label={label}
          style={{
            backgroundColor: indigo[800],
            color: 'white',
            marginRight: 8
          }}
        />
      )}
      <Chip
        label={score}
        // style={{ backgroundColor: indigo[800] }}
      />
    </Box>
  )
}
