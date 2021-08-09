import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import API from '../api'
import Card from '../components/card/Card'
import Carousel from 'react-material-ui-carousel'
import Banner from '../components/banner/Banner'

const items = [
  {
    Name: 'Electronics',
    Caption: 'Electrify your friends!',
    contentPosition: 'left',
    Items: [
      {
        Name: 'Macbook Pro',
        Image: 'https://source.unsplash.com/featured/?macbook'
      },
      {
        Name: 'iPhone',
        Image: 'https://source.unsplash.com/featured/?iphone'
      }
    ]
  },
  {
    Name: 'Home Appliances',
    Caption: 'Say no to manual home labour!',
    contentPosition: 'middle',
    Items: [
      {
        Name: 'Washing Machine WX9102',
        Image: 'https://source.unsplash.com/featured/?washingmachine'
      },
      {
        Name: 'Learus Vacuum Cleaner',
        Image: 'https://source.unsplash.com/featured/?vacuum,cleaner'
      }
    ]
  },
  {
    Name: 'Decoratives',
    Caption: 'Give style and color to your living room!',
    contentPosition: 'right',
    Items: [
      {
        Name: 'Living Room Lamp',
        Image: 'https://source.unsplash.com/featured/?lamp'
      },
      {
        Name: 'Floral Vase',
        Image: 'https://source.unsplash.com/featured/?vase'
      }
    ]
  }
]

export default function Home () {
  const [services, setServices] = useState([])
  const [tags, setTags] = useState([])
  const classes = useStyles()
  useEffect(() => {
    ;(async () => {
      const serviceResult = await API.Service.getAll()
      setServices(serviceResult)

      const tagResult = await API.Tag.getAll()
      setTags(tagResult)
    })()
  }, [])
  console.log(`tags`, tags)
  console.log(`services`, services)
  return (
    <Box mt={16}>
      <Carousel navButtonsAlwaysVisible>
        {items.map((item, index) => {
          return (
            <Banner
              item={item}
              key={index}
              contentPosition={item.contentPosition}
            />
          )
        })}
      </Carousel>
      {tags.map(t => (
        <Chip key={t.nombre} label={t.nombre} />
      ))}
      <Carousel navButtonsAlwaysVisible>
        {services.map(s => (
          <Grid xs={3} item>
            <Card
              key={s.nombre}
              title={s.nombre}
              imageUrl={
                'https://lh3.googleusercontent.com/MBD0jOYrgUVHTZIvHgHoZJUWyAwXrL-VVuJ-hhvG_c--qKkfVkS0VFuId8wU57ChBZO8IsJ2aOY6ueEByg=w960-h960-n-o-v1'
              }
              imageTitle={''}
              sintesis={s.sintesis}
              slogan={s.slogan}
            />
          </Grid>
        ))}
      </Carousel>
    </Box>
  )
}

export const useStyles = makeStyles(theme => ({
  title: { fontWeight: 'bold' }
}))
