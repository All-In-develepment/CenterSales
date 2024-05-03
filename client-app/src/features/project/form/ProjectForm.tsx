import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProjectFormValues } from "../../../app/models/project";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function ProjectForm() {
  const { projectStore } = useStore();
  const { 
    createProject, 
    updateProject, 
    loadProject, 
    loadingInitial 
  } = projectStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectFormValues>(
    new ProjectFormValues()
  );

  const validationSchema = Yup.object({
    projectName: Yup.string().required("The project name is required"),
    projectDescription: Yup.string().required(
      "The project description is required"
    ),
    projectIsActive: Yup.boolean().required("The project status is required"),
  });

  useEffect(() => {
    if (id)
      loadProject(id).then((project) =>
        setProject(new ProjectFormValues(project))
      );
  }, [id, loadProject]);

  function handleFormSubmit(project: ProjectFormValues) {
    if (!project.projectId) {
      let newProject = {
        ...project,
        projectIsActive:
          project.projectIsActive === true ? project.projectIsActive : false,
        projectId: uuid(),
      };
      createProject(newProject).then(() => {
        navigate(`/projects`);
        window.location.reload();
      });
    } else {
      updateProject({
        ...project,
        projectIsActive:
          project.projectIsActive === true ? project.projectIsActive : false,
      }).then(() => {
        navigate(`/projects`);
        window.location.reload();
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading project..." />;

  return (
    <Segment clearing>
      <Header content="Project Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={project}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="projectName" placeholder="Project Name" />
            <MyTextArea
              rows={3}
              placeholder="Project Description"
              name="projectDescription"
            />
            <MySelectInput
              options={[
                { text: "Active", value: true },
                { text: "Inactive", value: "false" },
              ]}
              placeholder="Project Status"
              name="projectIsActive"
            />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/projects"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
