import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { Seller } from "../models/seller";
import agent from "../api/agent";

export default class SellerStore {
  sellerRegistry = new Map<string, Seller>();
  selectedSeller?: Seller = undefined;
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
        this.sellerRegistry.clear();
        this.loadSellers();
      }
    );
  }

  setPagingParams = (pagingParams: PagingParams) => {
    this.pagingParams = pagingParams;
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
        params.append(key, value);
      }
    });

    return params;
  }

  loadSellers = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Sellers.list(this.axiosParams);
      result.data.forEach((seller) => {
        this.setSeller(seller);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get allSellers() {
    return Array.from(this.sellerRegistry.values());
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadSeller = async (id: string) => {
    let seller = this.getSeller(id);
    if (seller) {
      this.selectedSeller = seller;
      return seller;
    } else {
      this.loadingInitial = true;
      try {
        seller = await agent.Sellers.details(id);
        this.setSeller(seller);
        this.selectedSeller = seller;
        this.setLoadingInitial(false);
        return seller;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setSeller = (seller: Seller) => {
    this.sellerRegistry.set(seller.sellerId, seller);
  };

  private getSeller = (id: string) => {
    return this.sellerRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createSeller = async (seller: Seller) => {
    this.loading = true;
    try {
      await agent.Sellers.create(seller);
      this.sellerRegistry.set(seller.sellerId, seller);
      this.selectedSeller = seller;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateSeller = async (seller: Seller) => {
    this.loading = true;
    try {
      await agent.Sellers.update(seller);
      this.sellerRegistry.set(seller.sellerId, seller);
      this.selectedSeller = seller;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };
}
