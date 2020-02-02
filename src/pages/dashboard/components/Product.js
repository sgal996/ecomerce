import React from 'react'
import { Card } from 'react-bootstrap'
import styles from '../stylesheets/product.module.sass'
import {Button} from 'react-bootstrap'

export default function Product({ id, title, color, price, image, postCart}) {
  return (
    <Card
      border="primary"
      className={`${styles.card} p-2`}
      style={{ height: '100%' }}
    >
      <Card.Img className={styles.image} variant="top" src={image} />
      <Card.Body>
        <Card.Title className={styles.title}>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <div className={styles.subtitle}>
            {price}
          </div>
        </Card.Subtitle>
        <Card.Text className={styles.color}>
          {color}
        </Card.Text>
        <Button className={styles.btn} onClick={()=>postCart(id)} variant="outline-primary">Add to Bag</Button>
      </Card.Body>

    </Card>
  )
}
