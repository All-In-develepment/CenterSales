import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";
import { Pagination, PagingParams } from "../models/pagination";
import { IOdd } from "../models/odds";

export default class OddsStore {
  oddsRegistry = new Map<string, IOdd>();
  selectedOdd?: IOdd = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("all", true);

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.oddsRegistry.clear();
        this.loadOdds();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());

    return params;
  }

  // private setMaximas = (maximas: Maximas) => {
  //   this.maximasRegistry.set(maximas.id, maximas);
  // };

  loadOdds = async (leagueId: string = "") => {
    this.loadingInitial = true;
    try {
      const result = await agent.Odds.list(leagueId);

      this.setLoadingInitial(false);
      return result;

      // this.setPagination(result.pagination);
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
}
