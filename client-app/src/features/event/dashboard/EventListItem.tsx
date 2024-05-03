import { Link } from 'react-router-dom';
import { Segment, Label, Item, Button } from 'semantic-ui-react';
import { OriginEvent } from '../../../app/models/originEvent';

interface Props {
  originEvent: OriginEvent
}

export default function EventListItem({ originEvent }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/events/${originEvent.eventsId}`}>
                {originEvent.eventName}
              </Item.Header>
              <Item.Extra>
                <Button content='Edit' color='blue' floated='right' as={Link} to={`/events/${originEvent.eventsId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}