import ActivityStore from "./activityStore";
import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import CommentStore from "./commentStore";
import ProjectStore from "./projectStore";
import SellerStore from "./sellerStore";
import SaleStore from "./saleStore";
import ProductStore from "./productStore";
import BookmakerStore from "./bookmakerStore";

interface Store {
  activityStore: ActivityStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
  profileStore: ProfileStore;
  commentStore: CommentStore;
  projectStore: ProjectStore;
  sellerStore: SellerStore;
  saleStore: SaleStore;
  productStore: ProductStore;
  bookmakerStore: BookmakerStore;
}

export const store: Store = {
  activityStore: new ActivityStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
  profileStore: new ProfileStore(),
  commentStore: new CommentStore(),
  projectStore: new ProjectStore(),
  sellerStore: new SellerStore(),
  saleStore: new SaleStore(),
  productStore: new ProductStore(),
  bookmakerStore: new BookmakerStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
