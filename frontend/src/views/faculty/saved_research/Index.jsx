import { Box, Container, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import ResearchSavedCard from "../../../components/research/ResearchSavedCard";
import store from "../../../store/store";
import { useSelector } from "react-redux";
import {
  getFavorite,
  researchFavorite,
} from "../../../store/actions/favoriteAction";
import Header from "../../../components/Header/Header";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";

function Index() {
  const { data, loading, error } = useSelector((state) => state.favorite.get);

  useEffect(() => {
    store.dispatch(getFavorite());
  }, []);

  return (
    <Box sx={{ mx: [2, 4] }}>
      <Header
        primary={"Saved Researches"}
        secondary="This your list of saved researches"
      ></Header>

      <Box mb={4}></Box>

      <Paper
        sx={{ px: 1, py: 1, width: "auto", borderRadius: 2 }}
        elevation={2}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => store.dispatch(researchFavorite(e.target.value))}
          placeholder="Search Unique ID or Title.."
          fullWidth
          size="small"
          sx={{ bgcolor: "primary.light" }}
        ></TextField>
      </Paper>

      <ResearchSavedCard
        data={data}
        error={error}
        loading={loading}
      ></ResearchSavedCard>
    </Box>
  );
}

export default Index;
