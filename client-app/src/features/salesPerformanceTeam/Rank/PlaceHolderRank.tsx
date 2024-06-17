import React, { Fragment } from 'react'
import { PlaceholderLine, Placeholder } from 'semantic-ui-react'

const PlaceHolderRank = () => (
  <Fragment>
    <Placeholder fluid style={{width: '100%'}}>
      <PlaceholderLine length='very long' />
      <PlaceholderLine length='long' />
      <PlaceholderLine length='medium' />
    </Placeholder>
    <br />
    <Placeholder fluid style={{width: '100%'}}>
      <PlaceholderLine length='very long' />
      <PlaceholderLine length='long' />
      <PlaceholderLine length='medium' />
    </Placeholder>
  </Fragment>
)

export default PlaceHolderRank