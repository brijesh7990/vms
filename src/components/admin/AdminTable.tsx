import { useEffect, useMemo, useState } from "react";
import {
    AllCommunityModule,
    ModuleRegistry,
    Theme,
    themeQuartz,
    ColDef
} from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface AnalyticsInterface {
    address: string;
    mobile: string;
    name: string;
    purpose: string;
    unique_id: string;
    visit_count: number;
}

const myTheme: Theme = themeQuartz.withParams({
    backgroundColor: "#2A303D",
    foregroundColor: "white",
    headerTextColor: "white",
    headerBackgroundColor: "black",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
    headerColumnResizeHandleColor: "rgb(126, 46, 132)",
});

const AdminTable = () => {
    const [apiResponse, setApiResponse] = useState<AnalyticsInterface[]>([]);
    const paginationPageSizeSelector = useMemo<number[] | boolean>(() => {
        return [10, 15, 20];
    }, []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: false,
        };
    }, []);

    const theme = useMemo(() => myTheme, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_GET_ANALYTICS);
                const data = await response.json();
                setApiResponse(data.analytics);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            }
        };

        fetchData();
    }, []);

    const columnDefs: ColDef[] = [
        { headerName: "Unique ID", field: "unique_id", resizable: false },
        { headerName: "Name", field: "name", resizable: false },
        { headerName: "Visit Count", field: "visit_count", resizable: false },
        { headerName: "Mobile", field: "mobile", resizable: false },
        { headerName: "Address", field: "address", resizable: false },
        { headerName: "Purpose", field: "purpose", resizable: false },
    ];

    return (
        <div className="sm:h-[550px] h-[600px] sm:w-[65vw] w-[85vw] ag-theme-quartz">
            <AgGridReact
                theme={theme}
                defaultColDef={defaultColDef}
                rowData={apiResponse}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={paginationPageSizeSelector}
            />
        </div>
    );
};

export default AdminTable;