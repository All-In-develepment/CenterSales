import { Item, Segment } from "semantic-ui-react";
import { Register } from "../../../app/models/register";

interface Props {
  register: Register;
}

export default function RegisterListItem({ register }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{register.registerDate}</Item.Header>
              <Item.Description>
                <div>{register.registerTotal}</div>
                <div>{register.registerAmount}</div>
                <div>{register.registerAVG}</div>
                <div>{register.registerValue}</div>
                <div>{register.eventsId}</div>
                <div>{register.sellerId}</div>
                <div>{register.bookmakerId}</div>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
}