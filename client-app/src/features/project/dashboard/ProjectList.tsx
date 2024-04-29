import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import ProjectListItem from './ProjectListItem';
import React from 'react';

export default observer(function ProjectList() {
  const { projectStore } = useStore();
  const { allProjects } = projectStore;

  return (
    <>
      {allProjects.map(project => (
        <Fragment key={project.projectId}>
          <Header sub color='teal'>
            {/* {project.projectName} */}
          </Header>
          <ProjectListItem project={project} />
        </Fragment>
      ))}
    </>
  )
})