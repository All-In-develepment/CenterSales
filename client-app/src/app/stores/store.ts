import ActivityStore from "./activityStore";
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import FutebolVirtualStore from "./futebolVirtualStore";
import MaximasStore from "./maximasStore";

import LastGamesStore from "./lastGamesStore";
import OddsStore from "./oddsStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
  FutebolVirtualStore: FutebolVirtualStore;
  MaximasStore: MaximasStore;
  LastGames: LastGamesStore;
  Odds: OddsStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
  FutebolVirtualStore: new FutebolVirtualStore(),
  MaximasStore: new MaximasStore(),
  LastGames: new LastGamesStore(),
  Odds: new OddsStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
