import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../api/agent";
import { ProjectWeight } from "../models/projectWeight";

export default class ProjectWeightStore {
  projectWeightRegistry = new Map<string, ProjectWeight>();
  selectedProjectWeight: ProjectWeight | undefined = undefined;
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
        this.projectWeightRegistry.clear();
        this.loadProjectWeights();
      }
    );
  }

  private setProjectWeight = (projectWeight: ProjectWeight) => {
    this.projectWeightRegistry.set(projectWeight.projectWeightId, projectWeight);
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

  private getProjectWeight = (id: string) => {
    return this.projectWeightRegistry.get(id);
  };

  loadProjectWeights = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.ProjectWeights.list(this.axiosParams);
      result.data.forEach(projectWeight => {
        this.setProjectWeight(projectWeight);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadProjectWeight = async (id: string) => {
    let projectWeight = this.getProjectWeight(id);
    if (projectWeight) {
      this.selectedProjectWeight = projectWeight;
      return projectWeight;
    } else {
      this.loadingInitial = true;
      try {
        projectWeight = await agent.ProjectWeights.details(id);
        this.setProjectWeight(projectWeight);
        this.selectedProjectWeight = projectWeight;
        this.setLoadingInitial(false);
        return projectWeight;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  createProjectWeight = async (projectWeight: ProjectWeight) => {
    this.loading = true;
    try {
      await agent.ProjectWeights.create(projectWeight);
      this.projectWeightRegistry.set(projectWeight.projectWeightId, projectWeight);
      this.selectedProjectWeight = projectWeight;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateProjectWeight = async (projectWeight: ProjectWeight) => {
    this.loading = true;
    try {
      await agent.ProjectWeights.update(projectWeight);
      this.projectWeightRegistry.set(projectWeight.projectWeightId, projectWeight);
      this.selectedProjectWeight = projectWeight;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  deleteProjectWeight = async (id: string) => {
    this.loading = true;
    try {
      await agent.ProjectWeights.delete(id);
      this.projectWeightRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  get allProjectWeights() {
    return Array.from(this.projectWeightRegistry.values());
  }

  clearSelectedProjectWeight = () => {
    this.selectedProjectWeight = undefined;
  };
}