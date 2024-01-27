import React from "react";
import Header from "../../../components/header/Header";
import { useSelector } from "react-redux";
import RecordTable from "../components/RecordTable";
import { useFetch } from "../../../hooks/useFetch";
import store from "../../../store/store";
import { getHealthRecords } from "../healthThunks";
import ViewDialog from "../components/Dialogs/ViewDialog";
import useDialog from "../../../hooks/useDialog";
import useData from "../../../hooks/useData";

function FormRecord() {
  const { data, loading, error } = useSelector(
    (state) => state.healthForm.getRecords
  );
  const { dialog, handleDialog } = useDialog({ view: false });
  const { state: form, handleChange } = useData([]);
  useFetch(() => store.dispatch(getHealthRecords()));

  return (
    <>
      <Header title={"Health Declaration Logs"} hideButton={true}></Header>
      <ViewDialog
        open={dialog.view}
        data={form}
        handleClose={() => handleDialog(false, "view")}
      ></ViewDialog>
      <RecordTable
        data={data}
        handleView={() => handleDialog(true, "view")}
        handleData={(data) => handleChange(data)}
      ></RecordTable>
    </>
  );
}

export default FormRecord;
