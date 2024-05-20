import { Link } from 'react-router-dom';
import { Item, Button, Segment, Label } from 'semantic-ui-react';
import { Project } from '../../../app/models/project';

interface Props {
    project: Project
}

export default function ProjectListItem({ project }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {project.projectIsActive ?
          <Label attached='top' color='green' content='Ativo' style={{ textAlign: 'center' }} />:
          <Label attached='top' color='red' content='Inativo' style={{ textAlign: 'center' }} />
        }
        <Item.Group>
          <Item>
            <Item.Content>
              {/* <Item.Header as={Link} to={`/projects/${project.projectId}`}> */}
                {project.projectName}
              {/* </Item.Header> */}
              <Item.Description>{project.projectDescription}</Item.Description>
              <Item></Item>
              <Item.Extra>
                <Button className='editProject' content='Editar' floated='right' as={Link} to={`/projects/${project.projectId}`} />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment.Group>
  )
}