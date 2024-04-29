import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { Sale } from "../models/sale";
import agent from "../api/agent";

export default class SaleStore {
  saleRegistry = new Map<string, Sale>();
  selectedSale: Sale | undefined = undefined;
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
        this.saleRegistry.clear();
        this.loadSales();
      }
    );
  }

  setPaginParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
  };

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "all") this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isActive":
        resetPredicate();
        this.predicate.set("isActive", true);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();
    params.append("pageNumber", this.pagingParams.pageNumber.toString());
    params.append("pageSize", this.pagingParams.pageSize.toString());
    this.predicate.forEach((value, key) => {
      if (key === "isActive") {
        params.append(key, value.toString());
      } else {
        params.append(key, value.toString());
      }
    });

    return params;
  }

  loadSales = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Sales.list(this.axiosParams);
      result.data.forEach((sale) => {
        this.setSale(sale);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get allSales() {
    return Array.from(this.saleRegistry.values());
  }

  private setSale = (sale: Sale) => {
    this.saleRegistry.set(sale.saleId, sale);
  };

  private getSale = (id: string) => {
    return this.saleRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createSale = async (sale: Sale) => {
    this.loading = true;
    try {
      await agent.Sales.create(sale);
      this.saleRegistry.set(sale.sellerId, sale);
      this.selectedSale = sale;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateSale = async (sale: Sale) => {
    this.loading = true;
    try {
      await agent.Sales.update(sale);
      this.saleRegistry.set(sale.sellerId, sale);
      this.selectedSale = sale;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  getGroupedSales = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Sales.saleRank(this.axiosParams);
      result.data
        .sort((a, b) => (b.salePrice ?? 0) - (a.salePrice ?? 0))
        .forEach((sale) => {
          this.setSale(sale);
        });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get groupedSaler() {
    console.log(`saleStore: ${this.saleRegistry.values()}`);
    return Array.from(this.saleRegistry.values());
  }
}
