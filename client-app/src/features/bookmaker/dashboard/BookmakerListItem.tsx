import { Link } from 'react-router-dom';
import { Bookmaker } from '../../../app/models/bookmaker';
import { Segment, Label, Item, Button } from 'semantic-ui-react';

interface Props {
  bookmaker: Bookmaker
}

export default function BookmakerListItem({ bookmaker }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/bookmakers/${bookmaker.bookmakerId}`}>
                {bookmaker.bookmakerName}
              </Item.Header>
              <Item.Extra>
                <Button content='Editar' color='blue' floated='right' as={Link} to={`/bookmakers/${bookmaker.bookmakerId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}