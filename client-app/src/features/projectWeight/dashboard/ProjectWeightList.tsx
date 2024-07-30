import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import ProjectWeightListItem from './ProjectWeightListItem';
import React from 'react';

export default observer(function ProjectWeightList() {
  const { projectWeightStore } = useStore();
  const { allProjectWeights } = projectWeightStore;

  return (
    <>
      {allProjectWeights.map((projectWeight) => (
        <Fragment key={projectWeight.projectWeightId}>
          {/* <Header sub color="teal">
            {projectWeight.projectWeightId}
          </Header> */}
          <ProjectWeightListItem projectWeight={projectWeight} />
        </Fragment>
      ))}
    </>
  );
})