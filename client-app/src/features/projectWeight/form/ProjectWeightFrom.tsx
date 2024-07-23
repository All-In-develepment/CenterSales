import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Form, Link, useNavigate, useParams } from "react-router-dom";
import { Form as FormSemantic, Label } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { ProjectWeightFormValues } from "../../../app/models/projectWeight";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import DatePicker from 'react-datepicker';
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function ProjectWeightForm() {
  const { projectWeightStore, projectStore } = useStore();
  const { 
    createProjectWeight, 
    updateProjectWeight, 
    loadProjectWeight, 
    loadingInitial 
  } = projectWeightStore;
  const { loadProjects, allProjects } = projectStore;
  const { id } = useParams();
  const navigate = useNavigate();
  const [dateProjectWeight, setDateProjectWeight] = useState(new Date());

  const [projectWeight, setProjectWeight] = useState<ProjectWeightFormValues>(
    new ProjectWeightFormValues()
  );
  
  const validationSchema = Yup.object({
    projectId: Yup.string().required("Selecione um projeto"),
    month: Yup.string().required("Escolha um mês"),
    salesValueWeight: Yup.number().required("Digite o peso do valor de vendas"),
    conversionWeight: Yup.number().required("Digite o peso da conversão"),
    registrationWeight: Yup.number().required("Digite o peso do registro"),
    depositWeight: Yup.number().required("Digite o peso do depósito"),
  });

  const handleDateChange = (date: Date) => {
    setDateProjectWeight(date);
  }

  useEffect(() => {
    if (id)
      loadProjectWeight(id).then((projectWeight) =>
        setProjectWeight(new ProjectWeightFormValues(projectWeight))
      );
  }, [id, loadProjectWeight]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  function handleFormSubmit(projectWeight: ProjectWeightFormValues) {
    if (!projectWeight.projectWeightId) {
      let newProjectWeight = {
        ...projectWeight,
        projectWeightId: uuid(),
        // Converte a data em string para salvar no banco no formato dd-MM-yyyyT00:00:00
        month: dateProjectWeight.toLocaleDateString().split('/').reverse().join('-') + 'T00:00:00',
      };
      createProjectWeight(newProjectWeight).then(() => {
        navigate(`/projectweight`);
        // window.location.reload();
      });
    } else {
      updateProjectWeight(projectWeight).then(() => {
        navigate(`/projectweight`);
        // window.location.reload();
      });
    }
  }

  if (loadingInitial) return <LoadingComponent content='Loading project weight...' />;

  return (
    <Segment clearing>
      <Header content='Project Weight Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={projectWeight}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MySelectInput options={
              allProjects.map(project => ({
                key: project.projectId,
                text: project.projectName,
                value: project.projectId,
              }))
            } placeholder='Project' name='projectId' />
            <MyDateInput name='month' />
            <MyTextInput placeholder='Peso de vendas' name='salesValueWeight' label="Peso vendas" />
            <MyTextInput placeholder='Peso de conversão' name='conversionWeight' label="Peso convesão" />
            <MyTextInput placeholder='Peso de cadastro' name='registrationWeight' label="Peso Cadastro" />
            <MyTextInput placeholder='Peso de Deposito' name='depositWeight' label="Peso deposito" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              as={Link}
              to='/projectweight'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  )
});