import {
  Badge,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ResearchUserTable from "../../../components/research/ResearchUserTable";
import Header from "../../../components/Header/Header";
import store from "../../../store/store";
import {
  getResearch,
  searchResearchByAuthor,
} from "../../../store/actions/researchAction";
import { useSelector } from "react-redux";

import Search from "../../../components/search/Index";

import AddModal from "../../../components/research/modal/AddModal";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { bulkUpload } from "../../../store/actions/researchAction";

function Index() {
  const { data, loading, error } = useSelector((state) => state.research.user);
  const { data: syncData, loading: syncLoading } = useSelector(
    (state) => state.research.sync_pending
  );
  const [query, setQuery] = useState(null);

  const test = () => {
    if (navigator.onLine) console.log("online");
    else console.log("offline");
  };

  const handleQuery = (data) => {
    setQuery(data);
    console.log("query", data);
    store.dispatch(getResearch(data));
  };

  useEffect(() => {
    store.dispatch(getResearch());
    window.addEventListener("online", test);
    window.addEventListener("offline", test);
  }, []);

  return (
    <Box sx={{ mx: [2, 4] }}>
      <Box display={{ xs: "block", lg: "flex" }} alignItems={"center"} mb={4}>
        <Header
          primary={"My Research"}
          secondary={" this is your research page."}
        ></Header>

        <Box flexGrow="1" display={{ xs: "none", lg: "block" }}></Box>
        <Box
          display={{
            xs: "none",
            lg: "flex",
          }}
        >
          <Badge
            badgeContent={syncData.length}
            color="primary"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Button
              sx={{
                mr: 1,
              }}
              variant="text"
              size="large"
              onClick={async () => {
                const res = await store.dispatch(bulkUpload());
                if (res) {
                }
              }}
              startIcon={<UploadTwoToneIcon fontSize="large" />}
            >
              <Typography fontSize={14} py={0.2} textTransform="capitalize">
                Sync Upload
              </Typography>
            </Button>
          </Badge>
          <AddModal />
        </Box>

        <Box
          display={{
            xs: "flex",
            lg: "none",
          }}
          mt={2}
        >
          <AddModal />
          <Badge
            badgeContent={syncData.length}
            color="primary"
            // overlap="circular"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Button
              sx={{
                mr: 1,
              }}
              variant="text"
              size="large"
              onClick={async () => {
                const res = await store.dispatch(bulkUpload());
                if (res) {
                }
              }}
              startIcon={<UploadTwoToneIcon fontSize="large" />}
            >
              <Typography fontSize={14} py={0.2} textTransform="capitalize">
                Sync Upload
              </Typography>
            </Button>
          </Badge>
        </Box>
      </Box>

      <Search placeholder={"Search ID or Title"} handleQuery={handleQuery} />
      <ResearchUserTable
        data={data}
        loading={loading}
        error={error}
      ></ResearchUserTable>
    </Box>
  );
}

export default Index;
