import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { Product } from "../models/product";
import agent from "../api/agent";

export default class ProductStore {
  productRegistry = new Map<string, Product>();
  selectedProduct?: Product = undefined;
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
        this.productRegistry.clear();
        this.loadProducts();
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
  };

  loadProducts = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Products.list(this.axiosParams);
      result.data.forEach((product) => {
        this.productRegistry.set(product.productId, product);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get allProducts() {
    return Array.from(this.productRegistry.values());
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadProduct = async (id: string) => {
    let product = this.getProduct(id);
    if (product) {
      this.selectedProduct = product;
      return product;
    } else {
      this.loadingInitial = true;
      try {
        product = await agent.Products.details(id);
        this.setProduct(product);
        this.selectedProduct = product;
        this.setLoadingInitial(false);
        return product;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };

  private setProduct = (product: Product) => {
    this.productRegistry.set(product.productId, product);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createProduct = async (product: Product) => {
    this.loading = true;
    try {
      await agent.Products.create(product);
      this.productRegistry.set(product.productId, product);
      this.selectedProduct = product;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateProduct = async (product: Product) => {
    this.loading = true;
    try {
      await agent.Products.update(product);
      this.productRegistry.set(product.productId, product);
      this.selectedProduct = product;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };
}
