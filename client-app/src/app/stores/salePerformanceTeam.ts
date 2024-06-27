import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../api/agent";
import { SalePerformanceTeam } from "../models/salePerformanceTeam";

export default class SalePerformanceTeamStore {
  salePerformanceTeamRegistry = new Map<number, SalePerformanceTeam>();
  selectedSalePerformanceTeam: SalePerformanceTeam | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map();

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.salePerformanceTeamRegistry.clear();
        this.loadSalePerformanceTeams();
      }
    );
  }

  private setSalePerformanceTeam = (salePerformanceTeam: SalePerformanceTeam) => {
    this.salePerformanceTeamRegistry.set(salePerformanceTeam.sptId, salePerformanceTeam);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    // params.append("StartDate", this.)
    return params;
  };

  private getSalePerformanceTeam = (id: number) => {
    return this.salePerformanceTeamRegistry.get(id);
  };

  loadSalePerformanceTeams = async (initialDate? : string, 
                                    finalDate? : string, 
                                    sellerId? : string | null, 
                                    projectId? : string | null) => {
    this.loadingInitial = true;
    if (initialDate) {
      this.axiosParams.append("StartDate", initialDate);
    }
    if (finalDate) {
      this.axiosParams.append("EndDate", finalDate);
    }
    if (sellerId) {
      this.axiosParams.append("SellerId", sellerId);
    }
    if (projectId) {
      this.axiosParams.append("ProjectId", projectId);
    }
    try {
      const response = await agent.SalePerformanceTeams.list(this.axiosParams);
      response.data.forEach((salePerformanceTeam) => {
        this.setSalePerformanceTeam(salePerformanceTeam);
      });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadSalePerformanceTeam = async (id: number) => {
    let salePerformanceTeam = this.getSalePerformanceTeam(id);
    if (salePerformanceTeam) {
      this.selectedSalePerformanceTeam = salePerformanceTeam;
      return salePerformanceTeam;
    } else {
      this.loadingInitial = true;
      try {
        salePerformanceTeam = await agent.SalePerformanceTeams.details(id);
        this.setSalePerformanceTeam(salePerformanceTeam);
        this.selectedSalePerformanceTeam = salePerformanceTeam;
        this.setLoadingInitial(false);
        return salePerformanceTeam;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  createSalePerformanceTeam = async (salePerformanceTeam: SalePerformanceTeam) => {
    this.loading = true;
    try {
      await agent.SalePerformanceTeams.create(salePerformanceTeam);
      this.salePerformanceTeamRegistry.set(salePerformanceTeam.sptId, salePerformanceTeam);
      this.selectedSalePerformanceTeam = salePerformanceTeam;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateSalePerformanceTeam = async (salePerformanceTeam: SalePerformanceTeam) => {
    this.loading = true;
    try {
      await agent.SalePerformanceTeams.update(salePerformanceTeam);
      this.salePerformanceTeamRegistry.set(salePerformanceTeam.sptId, salePerformanceTeam);
      this.selectedSalePerformanceTeam = salePerformanceTeam;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  deleteSalePerformanceTeam = async (id: number) => {
    this.loading = true;
    try {
      await agent.SalePerformanceTeams.delete(id);
      this.salePerformanceTeamRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  get allSalePerformanceTeams() {
    return Array.from(this.salePerformanceTeamRegistry.values());
  };

  clearSelectedSalePerformanceTeam = () => {
    this.selectedSalePerformanceTeam = undefined;
  };

  getRankByConversion = async (initialDate? : string, finalDate? : string) => {
    this.loadingInitial = true;
    try {
      this.salePerformanceTeamRegistry.clear();
      if (initialDate) {
        this.axiosParams.append("StartDate", initialDate);
      }
      if (finalDate) {
        this.axiosParams.append("EndDate", finalDate);
      }
      const response = await agent.SalePerformanceTeams.salePerformanceTeamRankBySeller(this.axiosParams);
      console.log(response.data)
      response.data
        .sort((a, b) => (a.sptavgConvertion > b.sptavgConvertion ? -1 : 1))
        .forEach((salePerformanceTeam) => {
          this.setSalePerformanceTeam(salePerformanceTeam);
        });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get groupedByConvertion() {
    return Array.from(this.salePerformanceTeamRegistry.values());
  };

  getRankByDeposit = async (initialDate? : string, finalDate? : string) => {
    this.loadingInitial = true;
    try {
      this.salePerformanceTeamRegistry.clear();
      if (initialDate) {
        this.axiosParams.append("StartDate", initialDate);
      }
      if (finalDate) {
        this.axiosParams.append("EndDate", finalDate);
      }
      const response = await agent.SalePerformanceTeams.salePerformanceTeamRankBySeller(this.axiosParams);
      response.data
        .sort((a, b) => (b.sptTotalSalesAmont ?? 0) - (a.sptTotalSalesAmont ?? 0))
        .forEach((salePerformanceTeam) => {
          this.setSalePerformanceTeam(salePerformanceTeam);
        });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  clearSalePerformanceTeamRegistry = () => {
    this.salePerformanceTeamRegistry.clear();
  }

  get groupedByDeposit() {
    return Array.from(this.salePerformanceTeamRegistry.values());
  };

  getRankBySale = async (initialDate? : string, finalDate? : string) => {
    this.loadingInitial = true;
    try {
      this.salePerformanceTeamRegistry.clear();
      if (initialDate) {
        this.axiosParams.append("StartDate", initialDate);
      }
      if (finalDate) {
        this.axiosParams.append("EndDate", finalDate);
      }
      const response = await agent.SalePerformanceTeams.salePerformanceTeamRankBySeller(this.axiosParams);
      response.data
        .sort((a, b) => ((a.sptTotalRedepositAmont + a.sptTotalRegisterAmont) > (b.sptTotalRedepositAmont + b.sptTotalRegisterAmont) ? -1 : 1))
        .forEach((salePerformanceTeam) => {
          this.setSalePerformanceTeam(salePerformanceTeam);
        });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get groupedBySele() {
    return Array.from(this.salePerformanceTeamRegistry.values());
  };
}