import { Link } from 'react-router-dom';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import { ProjectWeight } from '../../../app/models/projectWeight';

interface Props {
    projectWeight: ProjectWeight
}

export default function ProjectWeightListItem({ projectWeight }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/projectWeights/${projectWeight.projectWeightId}`}>
                {projectWeight.projectId}
              </Item.Header>
              <Item.Description>{projectWeight.month}</Item.Description>
              <Item.Description>{projectWeight.salesValueWeight}</Item.Description>
              <Item.Description>{projectWeight.conversionWeight}</Item.Description>
              <Item.Description>{projectWeight.registrationWeight}</Item.Description>
              <Item.Description>{projectWeight.depositWeight}</Item.Description>
              <Item></Item>
              <Item.Extra>
                <Button content='Editar' color='blue' floated='right' as={Link} to={`/projectWeight/${projectWeight.projectWeightId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}