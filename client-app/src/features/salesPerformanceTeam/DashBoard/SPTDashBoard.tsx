import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Form, Grid, Icon } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
import SPTList from "./SPTList";
import DatePicker from 'react-datepicker';
import { PagingParams } from "../../../app/models/pagination";
import MySelectInput from "../../../app/common/form/MySelectInput";
import LoadingComponent from "../../../app/layout/LoadingComponent";

export default observer(function SPTDashBoard() {
  const { salePerformanceTeamStore, projectStore, sellerStore } = useStore();
  const { loadSalePerformanceTeams, setPagingParams, pagination, loadingInitial } = salePerformanceTeamStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const [initialDate, setInitalDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(new Date());
  const [selectedSeller, setSelectedSeller] = useState<string | null>();
  const [selectedProject, setSelectedProject] = useState<string | null>();
  const { loadProjects, allProjects } = projectStore;
  const { loadSellers, allSellers } = sellerStore;

  const navigate = useNavigate();

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
                    onChange={(date: Date) => setInitalDate(date)}
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
                    onChange={(date: Date) => setFinalDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width="4">
              <Form>
                <Form.Field>
                  <MySelectInput options={
                    allSellers.map((seller) => ({
                      key: seller.sellerId,
                      text: seller.sellerName,
                      value: seller.sellerId,
                    }))} 
                    placeholder='Vendedor' 
                    name='sptSellerId' 
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column width="4">
              <div className="ui input">
                <input
                  type="text"
                  placeholder="Projeto"
                  style={{ width: "100%" }}
                />
              </div>
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