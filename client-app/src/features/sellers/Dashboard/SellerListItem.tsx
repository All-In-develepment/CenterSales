import { Fragment } from "react/jsx-runtime";
import { Button, Item, Label, Placeholder, Segment } from "semantic-ui-react";
import { Seller } from "../../../app/models/seller";
import { Link } from "react-router-dom";

interface Props {
  seller: Seller
}

export default function SellerListItem({ seller }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {seller.sellerIsActive ?
          <Label attached='top' color='green' content='Ativo' style={{ textAlign: 'center' }} />:
          <Label attached='top' color='red' content='Inativo' style={{ textAlign: 'center' }} />
        }
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/sellers/${seller.sellerId}`}>
                {seller.sellerName}
              </Item.Header>
              <Item></Item>
              <Item.Extra>
                <Button content='Editar' color='blue' floated='right' as={Link} to={`/sellers/${seller.sellerId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}