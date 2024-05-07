import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankByProjectListItem from "./RankByProjectListItem";

export default observer(function RankRegiterList() {
  const { registerStore } = useStore();
  const { groupedByProject } = registerStore;

  return (
    <>
      {groupedByProject.map(project => (
        <Fragment key={project.projectId}>
          <RankByProjectListItem register={project} />
        </Fragment>
      ))}
    </>
  );
});