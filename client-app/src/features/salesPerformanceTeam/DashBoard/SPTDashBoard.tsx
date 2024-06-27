import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Form, Grid, Icon } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
import SPTList from "./SPTList";
import DatePicker from 'react-datepicker';
import { PagingParams } from "../../../app/models/pagination";
import { format } from 'date-fns';
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function SPTDashBoard() {
  const { salePerformanceTeamStore, projectStore, sellerStore } = useStore();
  const { loadSalePerformanceTeams, setPagingParams, pagination, loadingInitial, clearSalePerformanceTeamRegistry } = salePerformanceTeamStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [initialDate, setInitalDate] = useState<Date | null>();
  const [finalDate, setFinalDate] = useState<Date | null>();
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { loadProjects, allProjects } = projectStore;
  const { loadSellers, allSellers } = sellerStore;

  const navigate = useNavigate();

  // Trate a mudança de data
  const handleChangeInitalaDate = (initialDate: Date) => {
    console.log(initialDate)
    setInitalDate(initialDate);
  }

  const handleChangeFinalDate = (finalDate: Date) => {
    console.log(finalDate)
    setFinalDate(finalDate);
  }

  let newInitialDate = undefined;
  if (initialDate) {
    newInitialDate = format(initialDate!, 'yyyy/MM/dd\'T\'00:00:00');
  }else{
    newInitialDate = undefined;
  }
  let newFinalDate = undefined;
  if (finalDate) {
    newFinalDate = format(finalDate!, 'yyyy/MM/dd\'T\'23:59:59');
  }else{
    newFinalDate = undefined;
  }

  // Trate a mudança de vendedor
  const handleChangeSeller = (seller: string) => {
    console.log(seller)
    setSelectedSeller(seller);
  }

  // Trate a mudança de projeto
  const handleChangeProject = (project: string) => {
    console.log(project)
    setSelectedProject(project);
  }

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadSalePerformanceTeams().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadProjects();
    loadSellers();
    loadSalePerformanceTeams();
  }, [loadSalePerformanceTeams, loadProjects, loadSellers]);

  useEffect(() => {
    // Limpar lista de performance
    clearSalePerformanceTeamRegistry();

    loadSalePerformanceTeams(newInitialDate, newFinalDate, selectedSeller, selectedProject);
  }, [newInitialDate, newFinalDate, selectedSeller, selectedProject]);

  if (loadingInitial) return <LoadingComponent content="Loading app" />;

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="8">
            <h1>Painel de cadastro de performance</h1>
          </Grid.Column>
          <Grid.Column width="8" textAlign="right">
            <a
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
              target="_blank"
              href="/spt/ranks"
            >
              <Icon name="list ol" /> Ranks
            </a>
            <button
              onClick={() => navigate("/spt/save")}
              className="ui green button"
              style={{ marginTop: "1.5em" }}
            >
              Criar
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {salePerformanceTeamStore.loadingInitial && !loadingNext ? (
        <h1>Loading...</h1>
      ) : (
        <>
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <Form>
                <Form.Field>
                  <label>De</label>
                  <DatePicker
                    selected={initialDate}
                    onChange={(date: Date) => handleChangeInitalaDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width="4">
              <Form>
                <Form.Field>
                  <label>Até</label>
                  <DatePicker
                    selected={finalDate}
                    onChange={(date: Date) => handleChangeFinalDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width="4">
              <Form>
                <Form.Field>
                  <label>Vendedor</label>
                  <select
                    value={selectedSeller == null ? 'Vendedor' : selectedSeller}
                    onChange={(e) => handleChangeSeller(e.target.value)}
                  >
                    {allSellers.map((seller) => (
                      <option key={seller.sellerId} value={seller.sellerId}>
                        {seller.sellerName}
                      </option>
                    ))}
                  </select>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width="4">
              <Form>
                <Form.Field>
                  <label>Projeto</label>
                  <select 
                    value={selectedProject == null ? 'Projeto' : selectedProject}
                    onChange={(e) => handleChangeProject(e.target.value)}
                  >
                    {allProjects.map((project) => (
                      <option key={project.projectId} value={project.projectId}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Column width="16">
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={
                  !loadingNext &&
                  !!pagination &&
                  pagination.currentPage < pagination.totalPages
                }
                initialLoad={false}
              >
                <SPTList />
              </InfiniteScroll>
          </Grid.Column>
        </Grid>
        </>
      )}
    </>
  );
});