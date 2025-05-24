import axios from 'api/logiApi'; //'http://localhost:8282/logi'
import axios2 from 'api/hrApi'; // 'http://localhost:8282/hr'   // 옛날 통합 API 버전
import axios3 from 'api/MSAApi'; // 'http://localhost:9102       // MSA 단위로 변경중

export const warehouseInfo = () =>
    // axios.get('/base/warehouseInfo');
    axios.get('/logiinfo/warehouse/list');

export const saveWarehouseInfo = (action) => {
    console.log("창고저장클릭" , action);
    axios.post('/logiinfo/warehouse/batch',
        action.payload
    );
}
//품목상세
export const searchItemInfoDetail = (action) =>
    axios.get('logiinfo/item/info-list', {
        params: {
            ableContractInfo: { itemGroupCode: action.payload.itemGroupCode }
        }
    });

export const saveItemBatchList =async (map) => {
    console.log('품목상세저장버튼api', map.payload);
    const result = await axios.post('/logiinfo/item/batchsave',
        map.payload
    );
    return result.data;
}


//자재조회
export const warehouseDetail = (action) =>
    axios.get('/stock/sto/warehousestocklist', {
        params: {
            warehouseCode: action.payload.warehouseCode
        }
    });

export const searchItemA = (code, detailCode) =>
    axios.get('/base/searchItem', {
        params: {
            searchCondition: code,
            itemClassification: 'a',
            itemGroupCode: detailCode,
            minPrice: '',
            maxPrice: ''
        }
    });

/* ItemInfo.js */
export const searchItemB = (code, detailCode) =>
    axios.get('/base/searchItem', {
        params: {
            searchCondition: code,
            itemClassification: detailCode,
            itemGroupCode: 'c',
            minPrice: '',
            maxPrice: ''
        }
    });

//코드조회
export const itemList = () =>
    axios.get('/logiinfo/item/group-list');

//코드상세🌲🌲🌲
export const codeDetailList = (action) =>
    axios.get('/compinfo/codedetail/list', {
        params: {
            divisionCodeNo: action.payload.divisionCodeNo
        }
    });

export const searchList = (divisionCode) =>
    axios.get('/base/codeList', {
        params: {
            divisionCode: divisionCode
        }
    });

export const batchItemListProcess = (map) =>
    axios.post('/base/batchItemListProcess', {
        batchList: map
    });

export const delBatchList = (delList) =>
    //axios.post('/base/batchItemListProcess', {
    axios.post('/compinfo/item/batch', {
        batchList: delList
    });

export const rowsBatchList = (rows) =>
    axios.post('/base/batchItemListProcess', {
        batchList: rows
    });

// /*코드 관리>상세코드 저장*/
// /*은비 수정*/
export const saveDetailCodeInfo = (action) =>
    axios.post('/compinfo/code', {
        // detailCodeList: action.payload.detailCodeList
        detailCodeList: action
    });


export const saveCodeInfo = async (action) =>{
    console.log('저@@@장@@@@했@@@나@@@@@',action);
    // axios.post('/base/batchListProcess', {
    const result = await axios.post('compinfo/code/batch', {
        batchList: action.payload
        })
    return result.data;
};
/* ItemInfo.js */

export const standardUnitPrice = (minPrice, maxPrice) =>
    axios.get('/base/searchItem', {
        params: {
            searchCondition: 'STANDARD_UNIT_PRICE',
            itemClassification: 'a',
            itemGroupCode: 'n', //의미없음
            minPrice: minPrice + '',
            maxPrice: maxPrice + ''
        }
    });

export const searchAllList = () =>
    axios.get('/base/searchItem', {
        params: {
            searchCondition: 'ALL',
            itemClassification: '',
            itemGroupCode: '',
            minPrice: '',
            maxPrice: ''
        }
    });

export const searchItem = async (divisionCode, setList, props, minPrice, maxPrice) => {
    if (divisionCode !== 'standardUnitPrice' || '') {
        await axios
            .get('/base/codeList', {
                params: {
                    divisionCode: divisionCode
                }
            })
            .then(function (respones) {
                setList(respones.data.detailCodeList);
            });
    }
    if (divisionCode === 'standardUnitPrice') {
        await axios
            .get('/base/searchItem', {
                params: {
                    searchCondition: 'STANDARD_UNIT_PRICE',
                    itemClassification: 'a',
                    itemGroupCode: 'n', //의미없음
                    minPrice: minPrice + '',
                    maxPrice: maxPrice + ''
                }
            })
            .then(function (respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
    }
    if (divisionCode === '') {
        await axios
            .get('/base/searchItem', {
                params: {
                    searchCondition: 'ALL',
                    itemClassification: '',
                    itemGroupCode: '',
                    minPrice: '',
                    maxPrice: ''
                }
            })
            .then(function (respones) {
                props.list(respones.data.gridRowJson);
                props.close();
            });
    }
};

/****************** 사업장 정보 *********************/
export const workplaceInfo = () => {
    return axios3.get('/compinfo/workplace/list', {
        params: {
            companyCode: 'COM-01'
        }
    });
};

export const saveWorkplace = (action) => {
    return axios3.post('/compinfo/workplace/batch', {
        batchList: action.payload
    });
};

/****************** 일반거래처 & 금융거래처 정보 *********************/

export const searchClient = (action) =>
    axios3.get(
        '/compinfo/customer/list',

        {
            params: {
                searchCondition: action.payload.searchCondition,
                workplaceCode: action.payload.workplaceCode,
                companyCode: action.payload.companyCode,
                itemGroupCode: action.payload.itemGroupCode
            }
        }
    );

export const saveClient = async (action) =>{
    console.log("@@@@@@@@@저장클릭@@@@@@@@@@",action);
    const result = await axios3.post('/compinfo/customer/batch',
        { batchList: action })

    return result.data;
};




export const searchFinan = (action) =>
    axios3.get(
        '/compinfo/financialaccountassociates/list',

        {
            params: {
                searchCondition: action.payload.searchCondition,
                workplaceCode: action.payload.workplaceCode
            }
        }
    );

export const saveFinanInfo = async (action) =>
{
    const result = await axios3.post('/compinfo/financialaccountassociates/batch',
        { batchList: action })
    return result.data;
}

/****************** 부서 정보 *********************/

export const deptInfoRequest = (action) =>
    axios3.get('/compinfo/department/list', {
        params: {
            searchCondition: action.payload.searchCondition,
            companyCode: action.payload.companyCode,
            workplaceCode: action.payload.workplaceCode
        }
    });

export const saveDeptInfo = (action) => axios3.post('/compinfo/department/batch', { batchList: action.payload });
