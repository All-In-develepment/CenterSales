import { makeAutoObservable, reaction } from "mobx";
import { Bookmaker } from "../models/bookmaker";
import { Pagination, PagingParams } from "../models/pagination";
import agent from "../api/agent";

export default class BookmakerStore {
  bookmakerRegistry = new Map<string, Bookmaker>();
  selectedBookmaker?: Bookmaker = undefined;
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
        this.bookmakerRegistry.clear();
        this.loadBookmakers();
      }
    );
  }

  private setBookmaker = (bookmaker: Bookmaker) => {
    this.bookmakerRegistry.set(bookmaker.bookmakerId, bookmaker);
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

  // Seleciona uma casa de aposta
  private getBookmaker = (id: string) => {
    return this.bookmakerRegistry.get(id);
  };

  // Listagem paginada de casa de apostas
  loadBookmakers = async () => {
    this.loadingInitial = true;
    try {
      const result = await agent.Bookmakers.list(this.axiosParams);
      result.data.forEach((bookmaker) => {
        console.log(bookmaker)
        this.bookmakerRegistry.set(bookmaker.bookmakerId, bookmaker);
      });
      this.setPagination(result.pagination);
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  // Carregar uma casa de apostas
  loadBookmaker = async (id: string) => {
    let bookmaker = this.getBookmaker(id);
    if (bookmaker) {
      this.selectedBookmaker = bookmaker;
      return bookmaker;
    } else {
      this.loadingInitial = true;
      try {
        bookmaker = await agent.Bookmakers.details(id);
        this.setBookmaker(bookmaker);
        this.selectedBookmaker = bookmaker;
        this.setLoadingInitial(false);
        return bookmaker;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  // Criar uma casa de apostas
  createBookmaker = async (bookmaker: Bookmaker) => {
    this.loading = true;
    try {
      await agent.Bookmakers.create(bookmaker);
      this.bookmakerRegistry.set(bookmaker.bookmakerId, bookmaker);
      this.selectedBookmaker = bookmaker;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  // Atualizar uma casa de apostas
  updateBookmaker = async (bookmaker: Bookmaker) => {
    this.loading = true;
    try {
      await agent.Bookmakers.update(bookmaker);
      this.bookmakerRegistry.set(bookmaker.bookmakerId, bookmaker);
      this.selectedBookmaker = bookmaker;
      this.editMode = false;
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  // Deletar uma casa de apostas
  deleteBookmaker = async (id: string) => {
    this.loading = true;
    try {
      await agent.Bookmakers.delete(id);
      this.bookmakerRegistry.delete(id);
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  };

  get allBookmakers() {
    return Array.from(this.bookmakerRegistry.values());
  };
}