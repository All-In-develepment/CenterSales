import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../api/agent";
import { Register } from "../models/register";

export default class RegisterStore {
  registerRegistry = new Map<string, Register>();
  selectedRegister?: Register = undefined;
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
        this.registerRegistry.clear();
        this.loadRegisters();
      }
    );
  }

  private setRegister = (register: Register) => {
    this.registerRegistry.set(register.registerId, register);
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
    return params;
  };

  private getRegister = (id: string) => {
    return this.registerRegistry.get(id);
  };

  loadRegisters = async () => {
    this.loadingInitial = true;
    try {
      const response = await agent.Registers.list(this.axiosParams);
      response.data.forEach((register) => {
        this.setRegister(register);
      });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadRegister = async (id: string) => {
    let register = this.getRegister(id);
    if (register) {
      this.selectedRegister = register;
      return register;
    } else {
      this.loadingInitial = true;
      try {
        register = await agent.Registers.details(id);
        this.setRegister(register);
        this.selectedRegister = register;
        this.setLoadingInitial(false);
        return register;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  createRegister = async (register: Register) => {
    this.loading = true;
    try {
      await agent.Registers.create(register);
      this.registerRegistry.set(register.registerId, register);
      this.selectedRegister = register;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateRegister = async (register: Register) => {
    this.loading = true;
    try {
      await agent.Registers.update(register);
      this.registerRegistry.set(register.registerId, register);
      this.selectedRegister = register;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  deleteRegister = async (id: string) => {
    this.loading = true;
    try {
      await agent.Registers.delete(id);
      this.registerRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  get allRegisters() {
    return Array.from(this.registerRegistry.values());
  };

  clearSelectedRegister = () => {
    this.selectedRegister = undefined;
  };

  getGroupedBySeller = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Registers.registerRankBySeller(this.axiosParams);
      result.data
        .sort((a, b) => (b.registerAVGConversion ?? 0) - a.registerAVGConversion ?? 0)
        .forEach((register) => {
          this.setRegister(register);
        });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  
  get groupedBySeller() {
    return Array.from(this.registerRegistry.values());
  };

  getGroupedByProject = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Registers.registerRankByProject(this.axiosParams);
      result.data
        .sort((a, b) => (b.registerAmount ?? 0) - a.registerAmount ?? 0)
        .forEach((register) => {
          this.setRegister(register);
        });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get groupedByProject() {
    return Array.from(this.registerRegistry.values());
  };
}