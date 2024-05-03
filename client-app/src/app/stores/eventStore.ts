import { makeAutoObservable, reaction } from "mobx";
import { Pagination, PagingParams } from "../models/pagination";
import { OriginEvent } from "../models/originEvent";
import agent from "../api/agent";

export default class EventStore {
  eventRegistry = new Map<string, OriginEvent>();
  selectedEvent?: OriginEvent = undefined;
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
        this.eventRegistry.clear();
        this.loadEvents();
      }
    );
  }

  private setEvent = (event: OriginEvent) => {
    this.eventRegistry.set(event.eventsId, event);
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

  private getEvent = (id: string) => {
    return this.eventRegistry.get(id);
  };

  loadEvents = async () => {
    this.loadingInitial = true;
    try {
      const response = await agent.Events.list(this.axiosParams);
      response.data.forEach((event) => {
        this.setEvent(event);
      });
      this.setPagination(response.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadEvent = async (id: string) => {
    let event = this.getEvent(id);
    if (event) {
      this.selectedEvent = event;
      return event;
    } else {
      this.loadingInitial = true;
      try {
        event = await agent.Events.details(id);
        this.setEvent(event);
        this.selectedEvent = event;
        this.setLoadingInitial(false);
        return event;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  createEvent = async (event: OriginEvent) => {
    this.loading = true;
    try {
      await agent.Events.create(event);
      this.setEvent(event);
      this.selectedEvent = event;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  updateEvent = async (event: OriginEvent) => {
    this.loading = true;
    try {
      await agent.Events.update(event);
      this.setEvent(event);
      this.selectedEvent = event;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  deleteEvent = async (id: string) => {
    this.loading = true;
    try {
      await agent.Events.delete(id);
      this.eventRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  get allEvents() {
    return Array.from(this.eventRegistry.values());
  };
}