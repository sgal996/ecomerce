import React, {Component} from 'react'
import HeaderContainer from '../../components/header/headerContainer'
import Product from './components/Product'
import LoadingAnimation from '../../components/loadingAnimation'
import Filter from './components/Filter'
import styles from './stylesheets/dashboard.module.sass'


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (!this.props.products) {
      this.props.getAllProducts()
    }
  }
  render() {
    const { products, applyFilters } = this.props
    return (
      <div className={styles.outbox}>
        {/* Header */}
        <HeaderContainer />
        <div className={styles.box}>
          {/* loading animation */}
          {this.props.loading &&
            <LoadingAnimation />
          }
          {/* filter */}
          <div className={styles.filter}>
            <Filter
              applyFilters={applyFilters}
            />
          </div>
          {/* products */}
          <div className={`row ${styles.products}`}>
            {products && products.map((p,idx) =>
              <div
                key={idx}
                className={`col-6 col-sm-4 col-md-4 col-lg-3 my-3 ${styles.product}`}

                >


                <Product
                  title={p.name}
                  price={`$${p.price} HRK`}
                  description={p.description}
                  image={p.category}
                  id={p.id}
                  postCart={this.props.postCart}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}





