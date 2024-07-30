import { Link } from 'react-router-dom';
import { Item, Button, Segment, Label, Grid, Divider } from 'semantic-ui-react';
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
              <Item.Header>
                {projectWeight.projectName} - {projectWeight.month.split('T')[0].split('-')[1]}/{projectWeight.month.split('T')[0].split('-')[0]}
              </Item.Header>
              <Divider />
              <Item.Description>Peso para vendas: {projectWeight.salesValueWeight}</Item.Description>
              <Item.Description>Peso para conversão: {projectWeight.conversionWeight}</Item.Description>
              <Item.Description>Peso para cadastro: {projectWeight.registrationWeight}</Item.Description>
              <Item.Description>Peso para deposito: {projectWeight.depositWeight}</Item.Description>
              <Item.Extra>
                <Button content='Editar' color='blue' floated='right' as={Link} to={`/projectweight/save/${projectWeight.projectWeightId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}