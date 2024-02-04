import React from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTab from "../../components/ProfileTab";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ViewDialog from "../../components/Dialogs/ViewDialog";
import { useFetch } from "../../../../hooks/useFetch";
import useValue from "../../../../hooks/useValue";
import useData from "../../../../hooks/useData";
import store from "../../../../store/store";
import {
  getUserById,
  getUserHealthRecords,
  getUserLocations,
} from "../../userThunks";
import useDialog from "../../../../hooks/useDialog";

function UserProfile() {
  const { id } = useParams();
  const { userHealthRecord, userLocation, userById } = useSelector(
    (state) => state.user
  );

  const { state: dataHealthRecord, handleChange: handleRecord } = useData();
  const {
    dialog: { view },
    handleDialog,
  } = useDialog({ view: false });

  useFetch(() => store.dispatch(getUserById(id)));
  useFetch(() => store.dispatch(getUserHealthRecords(id)));
  useFetch(() => store.dispatch(getUserLocations(id)));

  if (userHealthRecord.loading || userLocation.loading || userById.loading) {
    return <></>;
  }
  return (
    <>
      <ProfileHeader {...userById}></ProfileHeader>

      <Box mt={5}>
        <ViewDialog
          open={view}
          handleClose={() => handleDialog(false, "view")}
          data={dataHealthRecord}
        ></ViewDialog>
        <ProfileTab
          userHealthRecord={userHealthRecord.data}
          userLocation={userLocation.data}
          userContacts={userById?.data?.ExposedUser}
          handleView={(data) => {
            handleDialog(true, "view");
            handleRecord(data);
          }}
        ></ProfileTab>
      </Box>
    </>
  );
}

export default UserProfile;
