import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { Project } from "../models/project";
import agent from "../api/agent";

export default class ProjectStore {
  projectRegistry = new Map<string, Project>();
  selectedProject?: Project = undefined;
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
        this.projectRegistry.clear();
        this.loadProjects();
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

  loadProjects = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Projects.list(this.axiosParams);
      result.data.forEach((project) => {
        this.setProject(project);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  get allProjects() {
    return Array.from(this.projectRegistry.values());
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination;
  };

  loadProject = async (id: string) => {
    let project = this.getProject(id);
    if (project) {
      this.selectedProject = project;
      return project;
    } else {
      this.loadingInitial = true;
      try {
        project = await agent.Projects.details(id);
        this.setProject(project);
        runInAction(() => {
          this.selectedProject = project;
        });
        this.setLoadingInitial(false);
        return project;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setProject = (project: Project) => {
    this.projectRegistry.set(project.projectId, project);
  };

  private getProject = (id: string) => {
    return this.projectRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createProject = async (project: Project) => {
    this.loading = true;
    try {
      await agent.Projects.create(project);
      runInAction(() => {
        this.projectRegistry.set(project.projectId, project);
        this.selectedProject = project;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateProject = async (project: Project) => {
    this.loading = true;
    try {
      await agent.Projects.update(project);
      runInAction(() => {
        this.projectRegistry.set(project.projectId, project);
        this.selectedProject = project;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
