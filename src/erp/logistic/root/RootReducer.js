import { combineReducers } from 'redux';
import basicinfo from 'erp/logistic/base/reducer/BasicInfoReducer';
import logisticsinfo from 'erp/logistic/base/reducer/LogisticsInfoReducer';
import ProductionReducerCombine from 'erp/logistic/production/reducer/index';
import Sales from 'erp/logistic/sales/reducer/SalesReducer';
import transport from 'erp/logistic/transport/reducer/transportReducer';

const logistic = combineReducers({
    basicinfo,
    logisticsinfo,
    ProductionReducerCombine,
    Sales,
    transport
});
//🌲🌲🌲"logisticsinfo"가 의미하는게 LogisticsInfoReducer (리듀서)임
export default logistic;
