import { Typography, AppBar, Toolbar, TextField} from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import MyDialog from 'util/LogiUtil/SimpleModal';
import CustomerDialog from './CustomerDialog';
import moment from 'moment';
import Axios from 'axios';
import React, { useState } from 'react';
import { useThemeSwitcher } from 'mui-theme-switcher';
import { Button } from '@mui/material';

const EstimateDetail = ({
    handleAddEstimateDetailRow,
    columnDefsEstimateDetail,
    onGridReadyEstimateDetail,
    handleOpenDialog,
    frameworkComponents,
    components,
    rowData
}) => {
    const { dark } = useThemeSwitcher();

    return (
        <div>
            <div align="right">
                <Button onClick={handleAddEstimateDetailRow} variant="contained" color="secondary">
                    견적상세추가
                </Button>
            </div>
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
                    columnDefs={columnDefsEstimateDetail}
                    defaultColDef={{
                        resizable: true,
                        editable: true
                    }}
                    onGridSizeChanged={event => {
                        event.api.sizeColumnsToFit();
                      }}
                    rowSelection="single"
                    onGridReady={onGridReadyEstimateDetail}
                    onCellClicked={handleOpenDialog}
                    frameworkComponents={frameworkComponents}
                    components={components}
                    rowData={rowData}
                    style={{
                        height: '400%',
                        width: '100%'
                    }}
                />
            </div>
        </div>
    );
};

export default EstimateDetail;
