import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { SalePerformanceTeam, SalePerformanceTeamFormValues } from "../../../app/models/salePerformanceTeam";
import { Button, Form, FormGroup, Header, Segment } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyDateInput from "../../../app/common/form/MyDateInput";

export default observer(function SalePerformanceTeamForm() {
  const { salePerformanceTeamStore,
          projectStore, 
          sellerStore, 
          bookmakerStore, 
          eventStore
  } = useStore();
  const { createSalePerformanceTeam, 
          updateSalePerformanceTeam, 
          loadSalePerformanceTeams, 
          loadingInitial,
          loadSalePerformanceTeam
        } = salePerformanceTeamStore;
  const { loadProjects, allProjects } = projectStore;
  const { loadSellers, allSellers } = sellerStore;
  const { loadBookmakers, allBookmakers } = bookmakerStore;
  const { loadEvents, allEvents } = eventStore;
  const { id } = useParams();

  const navigate = useNavigate();
  const [salePerformanceTeam, setSalePerformanceTeam] = useState<SalePerformanceTeamFormValues>(new SalePerformanceTeamFormValues());

  // const salePerformanceTeam = new SalePerformanceTeamFormValues();

  const validationSchema = Yup.object({
    sptSellerId: Yup.string().required("The seller name is required"),
    sptProjectId: Yup.string().required("The project name is required"),
    sptTotalLeads: Yup.number().required("The total leads is required"),
    sptTotalSales: Yup.number().required("The total sales is required"),
    sptTotalSalesAmont: Yup.number().required("The total sales amount is required"),
    sptTotalRegister: Yup.number().required("The total register is required"),
    sptTotalRegisterAmont: Yup.number().required("The total register amount is required"),
    sptTotalRedeposit: Yup.number().required("The total redeposit is required"),
    sptTotalRedepositAmont: Yup.number().required("The total redeposit amount is required"),
    sptDate: Yup.string().required("The date is required"),
  });

  useEffect(() => {
    if (id) loadSalePerformanceTeam(Number(id)).then((spt) => setSalePerformanceTeam(new SalePerformanceTeamFormValues(spt)));
  }, [id, loadSalePerformanceTeams]);

  useEffect(() => {
    loadProjects();
    loadSellers();
    loadBookmakers();
    loadEvents();
    loadSalePerformanceTeams();
  }, [
      loadSalePerformanceTeams, 
      loadProjects, 
      loadSellers, 
      loadBookmakers, 
      loadEvents
    ]);

  function handleSalePerformanceTeamSubmit(spt: SalePerformanceTeam) {
    if (!spt.sptId) {

      let newSalePerformanceTeam = {
        ...spt,
        sptCreatedAt: spt.sptDate,
        sptUpdatedAt: spt.sptDate,
      };
      createSalePerformanceTeam(newSalePerformanceTeam).then(() => {
        navigate(`/spt`)
      });
    } else {
      updateSalePerformanceTeam(spt).then(() => {
        navigate(`/spt`)
      });
    }
  }
  
  if (loadingInitial) return <LoadingComponent content='Loading app' />;

  return (
    <Segment clearing>
      <Header content='Novo Registro' sub color='teal' />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={salePerformanceTeam}
        onSubmit={(values) => handleSalePerformanceTeamSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <FormGroup widths='equal'>
              <MySelectInput options={
                allSellers.map((seller) => ({
                  key: seller.sellerId,
                  text: seller.sellerName,
                  value: seller.sellerId,
                }))} 
                placeholder='Vendedor' 
                name='sptSellerId' 
              />
              <MySelectInput options={
                allProjects.map((project) => ({
                  key: project.projectId,
                  text: project.projectName,
                  value: project.projectId,
                }))} 
                placeholder='Projeto' name='sptProjectId' 
              />
              <MySelectInput options={
                allBookmakers.map((bookmaker) => ({
                  key: bookmaker.bookmakerId,
                  text: bookmaker.bookmakerName,
                  value: bookmaker.bookmakerId,
                }))} 
                placeholder='Casa de aposta' 
                name='sptBookmakerId' 
              />
              <MySelectInput options={
                allEvents.map((event) => ({
                  key: event.eventsId,
                  text: event.eventName,
                  value: event.eventsId,
                }))} 
                placeholder='Evento' 
                name='sptEventId' 
              />
            </FormGroup>
            <FormGroup widths='equal'>
              <MyDateInput name='sptDate' />
              <MyTextInput placeholder='Total de leads' name='sptTotalLeads' label="Total de Leads" />
              <MyTextInput placeholder='Total de vendas' name='sptTotalSales' label="Total de vendas" />
              <MyTextInput placeholder='Total em vendas (R$)' name='sptTotalSalesAmont' label="Total em vendas (R$)" />
            </FormGroup>
            <FormGroup widths='equal'>
              <MyTextInput placeholder='Total de registros' name='sptTotalRegister' label="Total de Cadastros" />
              <MyTextInput placeholder='Total em registros (R$)' name='sptTotalRegisterAmont' label="Total em registros (R$)" />
              <MyTextInput placeholder='Total de redepositos' name='sptTotalRedeposit' label="Total de redepositos" />
              <MyTextInput placeholder='Total em redepositos (R$)' name='sptTotalRedepositAmont' label="Total em redepositos (R$)" />
            </FormGroup>
            <Button
              disabled={isSubmitting || !dirty || !isValid} 
              loading={isSubmitting}
              floated="right"
              positive
              type='submit' 
              content='Salvar' 
            />
            <Button
              disabled={isSubmitting}
              as={Link}
              to="/spt"
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