import { createAction } from 'redux-actions';
import * as types from 'erp/logistic/base/action/LogisticsInfoActionType';
import {ADD_ITEM_DETAIL_LIST} from "erp/logistic/base/action/LogisticsInfoActionType";

/******************************************************** 물류정보 관리 ***************************************************************/
// 코드 관리
export const codeList = createAction(types.CODE_LIST);
export const searchCodeList = createAction(types.SEARCH_CODE_LIST);
export const addCodeList = createAction(types.ADD_CODE_LIST);
export const updateCodeList = createAction(types.UPDATE_CODE_LIST);
export const saveCodeList = createAction(types.SAVE_CODE_LIST);
export const delCodeTO = createAction(types.DEL_CODE_LIST);

//품목조회
export const searchItemList=createAction(types.SEARCH_ITEM_LIST);
export const searchItemListSuccess=createAction(types.SEARCH_ITEM_LIST_SUCCESS);

//품목상세조회
export const itemInfoDetail=createAction(types.SEACRCH_ITEM_DETAIL_LIST);
export const itemInfoDetailSuccess=createAction(types.SEACRCH_ITEM_DETAIL_LIST_SUCCESS);
export const saveItemDetailList = createAction(types.SAVE_ITEM_DETAIL_LIST);
export const addItemDetailList = createAction(types.ADD_ITEM_DETAIL_LIST);

//상세코드 관리
export const DetailCodeList = createAction(types.DETAIL_CODE_LIST);
export const addDetailCodeList = createAction(types.ADD_DEAIL_CODE_LIST);
export const saveDetailCodeList = createAction(types.SAVE_DEAIL_CODE_LIST);

//내가 함 만들어보는거 코드상세
export const codeDetailList= createAction(types.CODE_DETAIL_LIST); //🌲🌲🌲
//CODE_DETAIL_LIST == 'src/erp/logistic/Saga/CODE_DETAIL_SAGA'이다.
//dispatch(codeDetailList())를 호출하면 해당 타입의 액션이 발생한다.
export const codeDetailListSuccess=createAction(types.CODE_DETAIL_LIST_SUCCESS);

/******************************************************** 창고정보 관리 ***************************************************/
export const warehouseList = createAction(types.WAREHOUSE_LIST);
export const searchWarehouseList = createAction(types.SEARCH_WAREHOUSE_LIST);
export const searchWarehouseSuccess = createAction(types.SEARCH_WAREHOUSE_SUCCESS);
export const searchWarehouseFailure = createAction(types.SEARCH_WAREHOUSE_FAILURE);

export const addWareHouseTO = createAction(types.ADD_WAREHOUSE);
export const saveWarehouseList = createAction(types.SAVE_WAREHOUSE_LIST);

//창고 자재 조회
export const warehouseDetail = createAction(types.WAREHOUSE_DETAIL);
export const warehouseDetailSuccess=createAction(types.WAREHOUSE_DETAIL_SUCCESS);
