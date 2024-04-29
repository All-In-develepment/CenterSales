import { Link } from 'react-router-dom';
import { Product } from '../../../app/models/product';
import { Segment, Label, Item, Button } from 'semantic-ui-react';

interface Props {
  product: Product
}

export default function ProductListItem({ product }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {product.productIsActive ?
          <Label attached='top' color='green' content='Ativo' style={{ textAlign: 'center' }} />:
          <Label attached='top' color='red' content='Inativo' style={{ textAlign: 'center' }} />
        }
        <Item.Group>
          <Item>
            <Item.Content>
              {/* <Item.Header as={Link} to={`/products/${product.productId}`}> */}
                {product.productName}
              {/* </Item.Header> */}
              <Item.Description>{product.productPrice}</Item.Description>
              <Item></Item>
              <Item.Extra>
                <Button content='Editar' color='blue' floated='right' as={Link} to={`/products/${product.productId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}