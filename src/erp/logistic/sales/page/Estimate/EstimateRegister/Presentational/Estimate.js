import { Typography, AppBar, Toolbar, TextField} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import MyDialog from 'util/LogiUtil/SimpleModal';
import CustomerDialog from './CustomerDialog';
import moment from 'moment';
import Axios from 'axios';
import React, { useState } from 'react';
import { Today } from '@material-ui/icons';
import { useThemeSwitcher } from 'mui-theme-switcher';
import MainCard from "template/ui-component/cards/MainCard";
import { Button, Grid } from '@mui/material';

const Estimate = ({
    onChangeDate,
    addEstimateRow,
    saveEstimateRow,
    columnDefsEstimate,
    onGridReady,
    handleOpenDialog,
    components,
    rowData
}) => {
    const today = moment().format('YYYY-MM-DD');
    const { dark } = useThemeSwitcher();

    return (
        
            <MainCard
                content={false}
                title="견적등록"
                secondary={<Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                    <div align="right">
                <TextField
                    id="targetDate"
                    label="견적일자"
                    onChange={onChangeDate}
                    type={'date'}
                    defaultValue={today}
                />
                <Button onClick={addEstimateRow} variant="contained" color="secondary">
                    견적추가
                </Button>
                <Button onClick={saveEstimateRow} variant="contained" color="secondary">
                    일괄저장
                </Button>
            </div>
            </Grid>
                }>

            
            
            <div
                className={dark ? 'ag-theme-alpine-dark' : 'ag-theme-material'}
                align="center"
                skipHeaderOnAutoSize="true"
                enableColResize="true"
                enableSorting="true"
                enableFilter="true"
                enableRangeSelection="true"
                rowStyle={{ 'text-align': 'center' }}
                cellStyle={{ textAlign: 'center' }}
                style={{ height: 250, width: '100%', float: 'center' }}
            >
                <AgGridReact
                    columnDefs={columnDefsEstimate}
                    defaultColDef={{
                        resizable: true,
                        editable: true
                    }}
                    onGridSizeChanged={event => {
                        event.api.sizeColumnsToFit();
                      }}
                    rowSelection="single"
                    onGridReady={onGridReady}
                    onCellClicked={handleOpenDialog}
                    components={components}
                    rowData={rowData}
                    style={{
                        height: '400%',
                        width: '100%'
                    }}
                />
            </div>
                </MainCard>
       
    );
};

export default Estimate;
