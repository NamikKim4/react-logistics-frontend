import React, {useCallback, useEffect, useState} from 'react';
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import MyGrid from 'util/LogiUtil/MyGrid';
import { useDispatch, useSelector } from 'react-redux';
import {
    searchCodeList,
    addCodeList,
    saveCodeList,
    updateCodeList,
    delCodeTO
} from 'erp/logistic/base/action/LogisticsInfoAction'; //액션생성함수
import MyDialog from 'util/LogiUtil/MyDialog';
import AddCodeInfo from './AddCodeInfo';
import useAsync from "../../../../../util/useAsync";
import * as api from "../../api";

function CodeGrid(props) {
    console.log("propsssss🌲",props)//props 에는 setEdit,onClick가 들어있다.🌲
    const dispatch = useDispatch(); //react-redux에 속해있는 객체로, dispatch변수를 활용하여 액션을 호출한다.
    const codeList = useSelector(state => state.RootReducers.logistic.logisticsinfo.codeList); //리듀서함수인 codList를 선택함
    const list = codeList.filter(ele => ele.status !== 'DELETE');
    const [addOpenDialog, setAddOpenDialog] = useState(false);
    const [edit, setEdit] = useState(false);
    const [codeGird, setCodeGrid] = useState();

    const column = {  //그리드 컬럼
        columnDefs: [
            { width: '20', headerCheckboxSelection: false, checkboxSelection: true },
            { headerName: '구분 코드', field: 'divisionCodeNo' }, // hide:true
            { headerName: '코드 타입', field: 'codeType' },
            { headerName: '코드명', field: 'divisionCodeName' },
            { headerName: '변경', field: 'codeChangeAvailable' },
            { headerName: '설명', field: 'description', editable: edit }, //여기서 부모컴포넌트에서 받아온 edit변수안에 true나 false가 담기는것
            { headerName: '상태', field: 'status' } // editable : 편집가능  hide:true
        ]
    };

    const onCellClicked = params => { //여기서 params는 그리드에서 선택한 한줄의 data
        console.log("datttta🌲",params);
        props.onClick(params.data.divisionCodeNo); //여기서 props는 CodInfo에서 넘겨받은 props이고 props안에 setEdit,onClick가 들어있다.🌲
        console.log("확인용🌵🌵",params.data.divisionCodeNo)
        if (params.data.codeChangeAvailable === '변경가능') {
            props.setEdit(true);
            setEdit(true);
            codeGird.sizeColumnsToFit();//그리드 내의 모든 컬럼 너비를 자동으로 계산해서 그리드 전체 너비에 맞게 꽉 채워주는 역할
            // UpdateRow(params);
        } else {
            props.setEdit(false);
            setEdit(false);
            codeGird.sizeColumnsToFit();
        }
    };
    //🔥React에서 자식이 부모의 state를 직접 바꾸는 건 불가능하지만,부모가 setState 함수를 props로 넘겨주면,자식이 그걸 통해 부모의 state를 간접적으로 바꿀 수 있어요.

    // const UpdateRow = params => {
    //     params.data.status = 'UPDATE';
    //     dispatch(updateCodeList({ divisionCodeNo: params.data.divisionCodeNo }));
    // };

    const codeApi = params => {
        setCodeGrid(params.api);
    };

    const addClick = () => {
        setAddOpenDialog(true);
    };

    const delClick = () => {
        const selRowIndex = codeGird.getSelectedRows(); //선택한 행의 모든 데이터 목록 리턴
    
        for (let i = 0; i < selRowIndex.length; i++) {
            let nodeIndex = selRowIndex[i].childIndex; //nodeIndex는 선택한 행의 index를 가려내기 위한것.
            // if (codeGird.getRowNode(nodeIndex).data.status === 'INSERT')
            codeGird.getRowNode(nodeIndex).data.status = 'DELETE'; //소스코드 이상함; //여기만 보면 될듯. 쨋든 선택한 행의 data.status를 'DELETE'로 리턴
        } 

 
        let newList = [];
        codeGird.forEachNodeAfterFilter(ele => {
            //'forEachNodeAfterFilter'는 Array의 forEach와 비슷하지만 grid의 filter가 적용된 데이터만을 대상으로 한다는 차이가 있습니다.
            // callback data는 node라 불리는데 node는 grid에서 보이는 한 행이라고 생각하시면 되고, node에는 컬럼 정의와 data, index 등 여러 정보들이 포함되어 있습니다.
            newList = [...newList, ele.data];
            return ele.data;
        });
       
        dispatch(delCodeTO({ newList }));
    };

    const saveClick = () =>{

    }

    const close = () => {
        setAddOpenDialog(false);
    };
    const codeSubmit = codeTo => {
        dispatch(addCodeList( codeTo ));
        setAddOpenDialog(false);
    };



    useEffect(() => { //최초로 호출되는 콜백함수. init, doGet과 같음. 
        dispatch(searchCodeList());  //dispatch함수로 searchCodeList액션함수 실행
    }, []); //업데이트 될때마다 호출되지 않게 함수의 두번째 파라미터로 비어있는 배열을 주었다.

    return (
        <>
            <MyGrid
                column={column}
                // title={'코드 관리'}
                list={list} //그리드
                onCellClicked={onCellClicked}
                rowSelection="single"
                api={codeApi}
            >
             
            </MyGrid>
            <MyDialog open={addOpenDialog} close={close}>
                <div>
                    <AddCodeInfo onSubmit={codeSubmit} />
                </div>
            </MyDialog>

        </>
    );
}

export default CodeGrid;
