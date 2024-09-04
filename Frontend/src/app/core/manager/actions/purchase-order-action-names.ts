export enum PurchaseOrderActionName {
  LOAD_PAGINATED_PURCHASES = "[Purchase orders index] Load paginated purchases",
  LOADED_PAGINATED_PURCHASES = "[Purchase orders index] Loaded paginated purchases",
  CREATE_PURCHASE_ORDER = "[Add purchase order] Create purchase order",
  SET_ERROR = "[] Set error",
  SET_SUCCESS = "[Add, Edit , Purchase Order list ] Set success",
  ADD_GENERAL_DATA = "[Purchase general data] Add general data",
  ADD_PURCHASE_DEETAIL = "[Purchase order detail modal] Add purchase detail",
  DELETE_PURCHASE_DETAL = "[Purchase order detail] Delete purchase order detail",
  CLEAN_ORDER = "[Add purchase order] Clean order",
  DELETE_PURCHASE_ORDER = "[Purchase order list] Delete purchase order",
  LOAD_PURCHASE_DETAILS = "[Purchase order list] Load purchase details",
  LOADED_PURCHASE_DETAILS = "[EFFECTS] Loaded purchase details",
  LOAD_PURCHASE_ORDER_BY_ID = "[Purchase order list, Purchase order general data, Purchase order details] Load purchase order by id",
  LOADED_PURCHASE_ORDER_BY_ID = "[EFFECTS] Loaded purchase oirder by id",
  UPDATE_PURCHASE_ORDER = "[Edit purchase order] Update purchase order"
}