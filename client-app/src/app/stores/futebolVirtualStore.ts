import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent"; // Import the FutebolVirtual class
import { Pagination, PagingParams } from "../models/pagination";
import { FutebolVirtualGames } from "../models/futebolVirtualGames";
import { GameTimes } from "../models/gameTimes";

export default class FutebolVirtualStore {
  // load the FutebolVirtualGames ordered by date descending withouth pagination
  futebolVirtualGamesRegistry = new Map<string, FutebolVirtualGames>();
  futebolVirtualGameTimes?: GameTimes = undefined;
  selectedFutebolVirtualGame?: FutebolVirtualGames = undefined;
  loading = false;
  loadingInitial = false;
  pagination: Pagination | null = null;
  pagingParams = new PagingParams();
  predicate = new Map().set("startDate", new Date());

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams();
        this.futebolVirtualGamesRegistry.clear();
        this.loadFutebolVirtualGames();
      }
    );
  }

  private setFutebolGameTime = (futebolVirtualGame: FutebolVirtualGames) => {
    this.futebolVirtualGamesRegistry.set(
      futebolVirtualGame.id,
      futebolVirtualGame
    );
    this.futebolVirtualGamesRegistry.forEach((test) =>
      console.log("alou", test)
    );
  };

  // private setFutebolVirtualGameTimes = (gameTimes: GameTimes) => {
  //   this.futebolVirtualGameTimes.set(gameTimes.idCompetion.toString(), gameTimes);
  // }

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setPredicate = (predicate: string, value: string | Date) => {
    const resetPredicate = () => {
      this.predicate.forEach((value, key) => {
        if (key !== "startDate") this.predicate.delete(key);
      });
    };
    switch (predicate) {
      case "all":
        resetPredicate();
        this.predicate.set("all", true);
        break;
      case "isGoing":
        resetPredicate();
        this.predicate.set("isGoing", true);
        break;
      case "isHost":
        resetPredicate();
        this.predicate.set("isHost", true);
        break;
      case "startDate":
        this.predicate.delete("startDate");
        this.predicate.set("startDate", value);
        break;
    }
  };

  get axiosParams() {
    const params = new URLSearchParams();

    this.predicate.forEach((value, key: string) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  get futebolVirtualGamesByDate() {
    return Array.from(this.futebolVirtualGamesRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  // Get the FutebolVirtualGames ordered by date descending withouth pagination
  loadFutebolVirtualGames = async (
    leagueId: string = "",
    market: string = "",
    time: string = ""
  ) => {
    this.loadingInitial = true;
    // console.log(leagueId, market, time);
    try {
      const result = await agent.FutebolVirtualGame.list(
        leagueId,
        market,
        time
      );
      
      // this.setFutebolVirtualGameTimes(result);
      this.loadingInitial = false;
      return result;
    

      // result.forEach((futebolVirtualGame) =>
      //   this.setFutebolVirtualGame(futebolVirtualGame)
      // );
      // return this.futebolVirtualGamesRegistry;
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.setLoadingInitial(false);
      });
    }
  };
}
